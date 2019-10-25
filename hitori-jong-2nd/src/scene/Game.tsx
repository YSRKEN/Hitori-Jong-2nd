import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import MyHandTileList from 'parts/MyHandTileList';
import CommandButton from 'parts/CommandButton';
import { countHand, hasSora } from 'service/hand';
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
}> = ({
  drawFlg,
  soraFlg,
  selectedUnitCount,
  selectedMemberCount,
  backToTitle,
  resetGame,
  drawTile,
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
      <CommandButton text="使用：そら" showFlg={drawFlg && soraFlg} />
      <CommandButton
        text="打牌"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount === 1
        }
      />
      <CommandButton
        text="交換"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount === 2
        }
      />
      <CommandButton
        text="右シフト"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount >= 1
        }
      />
      <CommandButton
        text="左シフト"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount >= 1
        }
      />
      <CommandButton
        text="固定：ユニット"
        showFlg={
          !drawFlg && selectedUnitCount === 0 && selectedMemberCount >= 1
        }
      />
      <CommandButton
        text="解除：ユニット"
        showFlg={!drawFlg && selectedUnitCount > 0 && selectedMemberCount === 0}
      />
      <CommandButton text="確認：控え室" showFlg={!drawFlg} />
      <CommandButton text="転送：手牌" showFlg={!drawFlg} />
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
      dispatch({ type: 'drawTile', message: '' });
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
    />
  );
};

export default GameScene;
