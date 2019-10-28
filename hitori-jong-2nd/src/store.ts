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
  USER_MEMBER_INDEX,
} from 'constant/other';
import { Action } from 'constant/action';
import { ApplicationState } from 'context';
import { IDOL_LIST_COUNT } from 'constant/idol';
import { shuffleDeck } from 'service/algorithm';
import {
  createHandFromArray,
  drawTile,
  trashTile,
  shiftLeft,
  shiftRight,
  swapTile,
  injectUnit,
  ejectUnit,
  soraFunc,
  selectIdolFunc,
  chiTile,
  countHand,
  calcChiUnitList,
} from 'service/hand';
import {
  resetTrashArea,
  addTrashTile,
  getMemberFromTrashArea,
  getTrashArea,
  getMemberFromTrashAreaAsChi,
} from 'service/utility';
import { UNIT_LIST2 } from 'constant2/unit';
import { SORA_ID, SHIIKA_ID, IDOL_LIST2 } from 'constant2/idol';

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
  const [myHandS, setMyHandS] = useState(
    loadSetting('MyHandS', DEFAULT_HAND_S),
  );
  const setMyHandS2 = (hand: Hand) => {
    setMyHandS(hand);
    saveSetting('MyHandS', hand);
  };

  // 手牌のユニットの選択表示
  const [selectedUnitFlg, setSelectedUnitFlg] = useState<boolean[]>([]);

  // 手牌のメンバーの選択表示
  const [selectedMemberFlg, setSelectedMemberFlg] = useState<boolean[]>([]);

  // ゲーム画面における牌山
  const [tileDeck, setTileDeck] = useState(
    loadSetting('TileDeck', Array<number>()),
  );
  const setTileDeck2 = (deck: number[]) => {
    setTileDeck(deck);
    saveSetting('TileDeck', deck);
  };

  // 対戦相手の手牌(ゲーム画面用)
  const [otherHand, setOtherHand] = useState(
    loadSetting('OtherHand', Array<Hand>()),
  );
  const setOtherHand2 = (hands: Hand[]) => {
    setOtherHand(hands);
    saveSetting('OtherHand', hands);
  };

  // 早坂そらを使用したか？
  const [useSoraFlg, setUseSoraFlg] = useState(false);

  // 五十音表に移る前の画面
  const [oldScene, setOldScene] = useState<ApplicationMode>('Game');

  // 五十音表に移る前の選択位置
  const [oldSelectedTileIndex, setOldSelectedTileIndex] = useState(-1);

  // 五十音表で押したボタン
  const [selectedKana, setSelectedKana] = useState('あ');

  // リセット情報
  const [resetFlg, setResetFlg] = useState(false);

  // 担当アイドル
  const [myIdol, setMyIdol] = useState(loadSetting('MyIdol', 0));
  const setMyIdol2 = (idolId: number) => {
    setMyIdol(idolId);
    saveSetting('MyIdol', idolId);
  };

  // 「現在の手牌」を返す
  const getMyHand = () => {
    return applicationMode === 'Game' ? myHandG : myHandS;
  };

  // 「現在の手牌」を更新する
  const setMyHand = (hand: Hand) => {
    return applicationMode === 'Game' ? setMyHandG2(hand) : setMyHandS2(hand);
  };

  // 手牌の選択状態をリセットする
  const resetSelectedTileFlg = () => {
    const myHand = getMyHand();
    const temp = Array<boolean>(myHand.unit.length);
    temp.fill(false);
    setSelectedUnitFlg(temp);
    const temp2 = Array<boolean>(myHand.member.length);
    temp2.fill(false);
    setSelectedMemberFlg(temp2);
  };

  // リセットとして、洗牌・配牌を行う
  const resetGame = (tileDeckTemp?: number[]) => {
    setResetFlg(false);

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

    // 控え室の状態をリセットする
    resetTrashArea();

    // 牌を配る
    saveSetting('DeckPointer', HAND_TILE_COUNT * 4);

    // 選択状態もリセットする
    resetSelectedTileFlg();
  };

  // 牌山から牌を取る
  const drawTileFromDeck = (): number => {
    const deckPointer = loadSetting('DeckPointer', 0);

    if (tileDeck.length > deckPointer) {
      const tile = tileDeck[deckPointer];
      saveSetting('DeckPointer', deckPointer + 1);

      return tile;
    }
    setResetFlg(true);

    return 0;
  };

  // 他家の操作
  const moveOtherProducer = (memberIndex: number) => {
    // 牌を引く
    const enemyHand = otherHand[memberIndex];
    const newEnemyHand = drawTile(enemyHand, drawTileFromDeck());

    // 牌を捨てる
    const trashedMember = newEnemyHand.member[newEnemyHand.member.length - 1];
    const newEnemyHand2 = trashTile(
      newEnemyHand,
      newEnemyHand.member.length - 1,
    );
    addTrashTile(trashedMember, memberIndex + 1);
    const newOtherHand = [...otherHand];
    newOtherHand[memberIndex] = newEnemyHand2;
    setOtherHand2(newOtherHand);
  };

  useEffect(() => {
    resetSelectedTileFlg();
    // eslint-disable-next-line react-hooks/exhaustive-deps
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

  // ゲーム画面で手牌が変更になった際の処理
  useEffect(() => {
    // 手牌が12枚になった際の処理
    if (
      countHand(myHandG) === HAND_TILE_COUNT &&
      loadSetting('DeckPointer', 0) > HAND_TILE_COUNT * PRODUCER_COUNT
    ) {
      // 他家がツモリ、手牌を捨てる
      for (let pi = 0; pi < PRODUCER_COUNT - 1; pi += 1) {
        moveOtherProducer(pi);

        // 捨てられた手牌でチーできるかを確認
        const temp = getTrashArea()[pi + 1];
        const trashedTile = temp[temp.length - 1];
        const chiList = calcChiUnitList(myHandG, trashedTile);
        for (const unitId of chiList) {
          let message = `打牌「${IDOL_LIST2[trashedTile].name}」に対し、\n`;
          message += `ユニット「${UNIT_LIST2[unitId].name}」でチー可能です。\n`;
          message += `${UNIT_LIST2[unitId].member.map(
            id => IDOL_LIST2[id].name,
          )}でチーしますか？`;
          if (window.confirm(message)) {
            setMyHandG2(chiTile(myHandG, trashedTile, unitId));
            getMemberFromTrashAreaAsChi(pi + 1);

            return;
          }
        }
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [myHandG]);

  // リセット処理
  useEffect(() => {
    if (resetFlg) {
      window.alert('牌山から牌を引ききりました。盤面をリセットします。');
      resetGame();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetFlg]);

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
      // ゲーム画面に戻る
      case 'BackToGame':
        setApplicationMode2('Game');
        break;
      // 元の画面に戻る
      case 'BackToView':
        setApplicationMode2(oldScene);
        break;
      // ゲーム状態をリセットする
      case 'resetGame':
        resetGame();
        break;
      // 五十音表画面に移る
      case 'ToKanaKeyBoard':
        setOldScene(applicationMode);
        setOldSelectedTileIndex(parseInt(action.message, 10));
        setApplicationMode('KanaKeyBoard');
        break;
      // 牌をツモる
      case 'drawTile':
        setMyHandG2(drawTile(myHandG, drawTileFromDeck()));
        resetSelectedTileFlg();
        break;
      // 牌を切る
      case 'trashTile': {
        // 自分の手牌を切る
        const trashedTileIndex = selectedMemberFlg.indexOf(true);
        const trashedMember = myHandG.member[trashedTileIndex];
        setMyHandG2(trashTile(myHandG, trashedTileIndex));
        addTrashTile(trashedMember, USER_MEMBER_INDEX);
        resetSelectedTileFlg();
        break;
      }
      // 他家の操作(とりあえずツモ切りだけさせる)
      case 'moveOtherProducer': {
        // メンバーを特定
        const memberIndex = parseInt(action.message, 10);
        moveOtherProducer(memberIndex);
        break;
      }
      // 手牌のユニットをタップする
      case 'selectUnit': {
        const selectedIndex = parseInt(action.message, 10);
        const temp = [...selectedUnitFlg];
        temp[selectedIndex] = !temp[selectedIndex];
        setSelectedUnitFlg(temp);
        break;
      }
      // 手牌のメンバーをタップする
      case 'selectMember': {
        const selectedIndex = parseInt(action.message, 10);
        const temp = [...selectedMemberFlg];
        temp[selectedIndex] = !temp[selectedIndex];
        setSelectedMemberFlg(temp);
        break;
      }
      // 選択した手牌のメンバーを左にシフトさせる
      case 'shiftLeft': {
        const myHand = getMyHand();
        const { newHand, newSelectedMemberFlg } = shiftLeft(
          myHand,
          selectedMemberFlg,
        );
        setMyHand(newHand);
        setSelectedMemberFlg(newSelectedMemberFlg);
        break;
      }
      // 選択した手牌のメンバーを右にシフトさせる
      case 'shiftRight': {
        const myHand = getMyHand();
        const { newHand, newSelectedMemberFlg } = shiftRight(
          myHand,
          selectedMemberFlg,
        );
        setMyHand(newHand);
        setSelectedMemberFlg(newSelectedMemberFlg);
        break;
      }
      // 選択した手牌のメンバーを交換する
      case 'swapTile': {
        const myHand = getMyHand();
        setMyHand(swapTile(myHand, selectedMemberFlg));
        resetSelectedTileFlg();
        break;
      }
      // 選択した手牌でユニットを結成する
      case 'injectUnit': {
        const myHand = getMyHand();
        setMyHand(injectUnit(myHand, selectedMemberFlg));
        resetSelectedTileFlg();
        break;
      }
      // 選択した手牌のユニットを解除する
      case 'ejectUnit': {
        const myHand = getMyHand();
        const selectedUnitId = myHand.unit[selectedUnitFlg.indexOf(true)];
        if (applicationMode === 'Game' && UNIT_LIST2[selectedUnitId].chiFlg) {
          // ゲーム画面で、かつチーしたユニットである際は解除できないようにする
          break;
        }
        setMyHand(ejectUnit(myHand, selectedUnitFlg));
        resetSelectedTileFlg();
        break;
      }
      // ゲーム画面→シミュレーション画面に手牌を転送する
      case 'copyTile':
        setMyHandS2({ unit: [...myHandG.unit], member: [...myHandG.member] });
        if (window.confirm('シミュレーション画面に遷移しますか？')) {
          setApplicationMode2('Simulation');
        }
        break;
      // 控え室を表示する
      case 'showTrash':
        setApplicationMode('Trash');
        break;
      // 早坂そらを使用する
      case 'useSora':
        setUseSoraFlg(true);
        setApplicationMode('Trash');
        break;
      // 捨て牌を選択した際の動き
      case 'selectTrash': {
        if (useSoraFlg) {
          const temp = action.message.split(',');
          const idolId = parseInt(temp[0], 10);
          const pId = parseInt(temp[1], 10);
          setMyHandG2(soraFunc(myHandG, idolId));
          getMemberFromTrashArea(pId, idolId);
          setApplicationMode2('Game');
        }
        break;
      }
      // かな文字を選択
      case 'selectKana': {
        setSelectedKana(action.message);
        setApplicationMode('IdolSelector');
        break;
      }
      // アイドルを選択
      case 'selectIdol': {
        const idolId = parseInt(action.message, 10);
        if (oldSelectedTileIndex >= 0) {
          // シミュレーション画面における手牌変化
          setMyHandS2(selectIdolFunc(myHandS, oldSelectedTileIndex, idolId));
          setApplicationMode(oldScene);
        } else {
          // ゲーム画面・シミュレーション画面における担当変化
          if (idolId !== SORA_ID && idolId !== SHIIKA_ID) {
            setMyIdol2(idolId);
          }
          setApplicationMode(oldScene);
        }
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
    selectedUnitFlg,
    selectedMemberFlg,
    selectedKana,
    myIdol,
    dispatch,
  };
};

export default useStore;
