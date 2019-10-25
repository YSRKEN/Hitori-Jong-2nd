import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import MyHandTileList from 'parts/MyHandTileList';
import CommandButton from 'parts/CommandButton';
import { countHand, hasSora } from 'service/hand';
import { getResetFlg } from 'service/utility';
import { HAND_TILE_COUNT } from 'constant/other';

// ゲーム画面
const GameSceneBase: React.FC<{
  drawFlg: boolean;
  soraFlg: boolean;
  selectedUnitCount: number;
  selectedMemberCount: number;
  backToTitle: () => void;
  resetGame: () => void;
  drawTile: () => void;
  trashTile: () => void;
  shiftLeft: () => void;
  shiftRight: () => void;
  swapTile: () => void;
  injectUnit: () => void;
  ejectUnit: () => void;
  showTrash: () => void;
  copyTile: () => void;
  useSora: () => void;
}> = ({
  drawFlg,
  soraFlg,
  selectedUnitCount,
  selectedMemberCount,
  backToTitle,
  resetGame,
  drawTile,
  trashTile,
  shiftLeft,
  shiftRight,
  swapTile,
  injectUnit,
  ejectUnit,
  showTrash,
  copyTile,
  useSora,
}) => (
  <>
    <div className="l-header">
      <button
        type="button"
        className="l-margin-right default-button back-title"
        onClick={backToTitle}
      >
        タイトルに戻る
      </button>
      <button
        type="button"
        className="default-button reset-game"
        onClick={resetGame}
      >
        リセット
      </button>
    </div>
    <div className="l-main-game">
      <CommandButton text="ツモ" showFlg={drawFlg} onClick={drawTile} />
      <CommandButton text="使用：そら" showFlg={drawFlg && soraFlg} onClick={useSora} />
      <CommandButton
        text="打牌"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount === 1
        }
        onClick={trashTile}
      />
      <CommandButton
        text="交換"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount === 2
        }
        onClick={swapTile}
      />
      <CommandButton
        text="左シフト"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount >= 1
        }
        onClick={shiftLeft}
      />
      <CommandButton
        text="右シフト"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount >= 1
        }
        onClick={shiftRight}
      />
      <CommandButton
        text="固定：ユニット"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount >= 1
        }
        onClick={injectUnit}
      />
      <CommandButton
        text="解除：ユニット"
        showFlg={!drawFlg && selectedUnitCount > 0 && selectedMemberCount === 0}
        onClick={ejectUnit}
      />
      <CommandButton
        text="確認：控え室"
        showFlg={!drawFlg}
        onClick={showTrash}
      />
      <CommandButton text="転送：手牌" showFlg={!drawFlg} onClick={copyTile} />
    </div>
    <div className="l-footer">
      <MyHandTileList />
    </div>
  </>
);

const GameScene: React.FC = () => {
  const { myHandG, selectedUnitFlg, selectedMemberFlg, dispatch } = useContext(
    ApplicationContext,
  );

  const resetGame = () => {
    if (window.confirm('盤面をリセットしますか？')) {
      dispatch({ type: 'resetGame', message: '' });
    }
  };

  const trashTile = () => {
    let resetFlg = false;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      dispatch({ type: 'trashTile', message: '' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      dispatch({ type: 'moveOtherProducer', message: '0' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      dispatch({ type: 'moveOtherProducer', message: '1' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      dispatch({ type: 'moveOtherProducer', message: '2' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      break;
    }
    if (resetFlg) {
      window.alert('牌山から牌を引ききりました。盤面をリセットします。');
      dispatch({ type: 'resetGame', message: '' });
    }
  };

  return (
    <GameSceneBase
      drawFlg={countHand(myHandG) === HAND_TILE_COUNT}
      soraFlg={hasSora(myHandG)}
      selectedUnitCount={selectedUnitFlg.filter(flg => flg).length}
      selectedMemberCount={selectedMemberFlg.filter(flg => flg).length}
      backToTitle={() => dispatch({ type: 'BackToTitle', message: '' })}
      resetGame={resetGame}
      drawTile={() => dispatch({ type: 'drawTile', message: '' })}
      trashTile={trashTile}
      shiftLeft={() => dispatch({ type: 'shiftLeft', message: '' })}
      shiftRight={() => dispatch({ type: 'shiftRight', message: '' })}
      swapTile={() => dispatch({ type: 'swapTile', message: '' })}
      injectUnit={() => dispatch({ type: 'injectUnit', message: '' })}
      ejectUnit={() => dispatch({ type: 'ejectUnit', message: '' })}
      showTrash={() => dispatch({ type: 'showTrash', message: '' })}
      copyTile={() => dispatch({ type: 'copyTile', message: '' })}
      useSora={() => dispatch({ type: 'useSora', message: '' })}
    />
  );
};

export default GameScene;
