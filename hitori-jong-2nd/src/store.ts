import { useState, useEffect } from 'react';
import { loadSetting, saveSetting } from 'service/setting';
import {
  ApplicationMode,
  DEFAULT_HAND_G,
  DEFAULT_HAND_S,
  Hand,
  HAND_TILE_COUNT,
  TILE_COUNT,
  PRODUCER_COUNT,
  HAND_TILE_COUNT_PLUS,
} from 'constant/other';
import { Action } from 'constant/action';
import { ApplicationState } from 'context';
import { IDOL_LIST_COUNT } from 'constant/idol';
import { shuffleDeck } from 'service/algorithm';
import { createHandFromArray, drawTile, calcUnitToIndex, calcMemberToIndex } from 'service/hand';

const useStore = (): ApplicationState => {
  // アプリケーションの動作モード
  const [applicationMode, setApplicationMode] = useState<ApplicationMode>(
    loadSetting<ApplicationMode>('ApplicationMode', 'Title'),
  );
  const setApplicationMode2 = (mode: ApplicationMode) => {
    setApplicationMode(mode);
    saveSetting('ApplicationMode', mode);
  };

  // ゲーム画面における手牌
  const [myHandG, setMyHandG] = useState<Hand>(
    loadSetting<Hand>('MyHandG', DEFAULT_HAND_G),
  );
  const setMyHandG2 = (hand: Hand) => {
    setMyHandG(hand);
    saveSetting('MyHandG', hand);
  };

  // シミュレーション画面における手牌
  const [myHandS] = useState(loadSetting('MyHandS', DEFAULT_HAND_S));

  // 手牌の選択表示
  const [selectedTileFlg, setSelectedTileFlg] = useState<boolean[]>([]);

  // ゲーム画面における牌山
  const [tileDeck, setTileDeck] = useState(
    loadSetting('TileDeck', Array<number>()),
  );
  const setTileDeck2 = (deck: number[]) => {
    setTileDeck(deck);
    saveSetting('TileDeck', deck);
  };

  // 牌山用のポインター
  const [deckPointer, setDeckPointer] = useState(loadSetting('DeckPointer', 0));

  // 対戦相手の手牌(ゲーム画面用)
  const [, setOtherHand] = useState(
    loadSetting('OtherHand', Array<Hand>()),
  );
  const setOtherHand2 = (hands: Hand[]) => {
    setOtherHand(hands);
    saveSetting('OtherHand', hands);
  };

  // リセットとして、洗牌・配牌を行う
  const resetGame = (tileDeckTemp?: number[]) => {
    let tileDeckTemp2 =
      typeof tileDeckTemp !== 'undefined' ? [...tileDeckTemp] : [...tileDeck];
    tileDeckTemp2 = shuffleDeck(tileDeckTemp2);
    setTileDeck2(tileDeckTemp2);

    // 指定した範囲の牌をセットする
    const otherHandtemp: Hand[] = [];
    for (let pi = 0; pi < PRODUCER_COUNT; pi += 1) {
      const handArray = tileDeckTemp2.slice(
        pi * HAND_TILE_COUNT,
        (pi + 1) * HAND_TILE_COUNT,
      );
      if (pi === 0) {
        setMyHandG2(createHandFromArray(handArray));
      } else {
        otherHandtemp.push(createHandFromArray(handArray));
      }
    }
    setOtherHand2(otherHandtemp);

    // 牌を配る
    setDeckPointer(HAND_TILE_COUNT * 4);

    // 選択状態もリセットする
    const temp = Array<boolean>(HAND_TILE_COUNT_PLUS);
    temp.fill(false);
    setSelectedTileFlg(temp);
  };

  useEffect(() => {
    const temp = Array<boolean>(HAND_TILE_COUNT_PLUS);
    temp.fill(false);
    setSelectedTileFlg(temp);
  }, [applicationMode]);

  // アプリケーション開始時、牌山が初期化されていない時は初期化する
  useEffect(() => {
    if (tileDeck.length === 0) {
      // 牌山を作る
      const tileDeckTemp = Array<number>();
      for (let id = 0; id < IDOL_LIST_COUNT; id += 1) {
        for (let count = 0; count < TILE_COUNT; count += 1) {
          tileDeckTemp.push(id);
        }
      }

      // その他の初期化処理
      resetGame(tileDeckTemp);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // dispatch
  const dispatch = (action: Action) => {
    switch (action.type) {
      // ゲーム画面に移る
      case 'TitleToGame':
        setApplicationMode2('Game');
        break;
      // シミュレーション画面に移る
      case 'TitleToSimulation':
        setApplicationMode2('Simulation');
        break;
      // タイトル画面に戻る
      case 'BackToTitle':
        setApplicationMode2('Title');
        break;
      // ゲーム状態をリセットする
      case 'resetGame':
        resetGame();
        break;
      // 牌をツモる
      case 'drawTile':
          setMyHandG2(drawTile(myHandG, tileDeck[deckPointer]));
          setDeckPointer(deckPointer + 1);
        break;
      // 手牌のユニットをタップする
      case 'selectUnit':{
        const selectedIndex = parseInt(action.message, 10);
        const selectedRange = calcUnitToIndex(applicationMode === 'Game' ? myHandG : myHandS);
        const temp = [...selectedTileFlg];
        for (let ti = selectedRange[selectedIndex].begin; ti <  selectedRange[selectedIndex].end; ti += 1) {
          temp[ti] = !temp[ti];
        }
        setSelectedTileFlg(temp);
        break;
      }
      // 手牌のメンバーをタップする
      case 'selectMember':{
        const selectedIndex = parseInt(action.message, 10);
        const selectedRange = calcMemberToIndex(applicationMode === 'Game' ? myHandG : myHandS);
        const temp = [...selectedTileFlg];
        temp[selectedRange[selectedIndex]] = !temp[selectedRange[selectedIndex]];
        setSelectedTileFlg(temp);
        break;
      }
      default:
        break;
    }
  };

  return {
    applicationMode,
    myHandG,
    myHandS,
    selectedTileFlg,
    dispatch,
  };
};

export default useStore;
