import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import MyHandTileList from 'parts/MyHandTileList';

// ゲーム画面
const GameSceneBase: React.FC<{
  backToTitle: () => void;
  resetGame: () => void;
}> = ({ backToTitle, resetGame }) => (
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
      <button type="button" className="l-margin-right default-button command">
        ツモ
      </button>
      <button type="button" className="l-margin-right default-button command">
        使用：そら
      </button>
      <button type="button" className="l-margin-right default-button command">
        打牌
      </button>
      <button type="button" className="l-margin-right default-button command">
        交換
      </button>
      <button type="button" className="l-margin-right default-button command">
        右シフト
      </button>
      <button type="button" className="l-margin-right default-button command">
        左シフト
      </button>
      <button type="button" className="l-margin-right default-button command">
        固定：ユニット
      </button>
      <button type="button" className="l-margin-right default-button command">
        解除：ユニット
      </button>
      <button type="button" className="l-margin-right default-button command">
        確認：控え室
      </button>
      <button type="button" className="l-margin-right default-button command">
        転送：手牌
      </button>
    </div>
    <div className="l-footer">
      <MyHandTileList />
    </div>
  </>
);

const GameScene: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const resetGame = () => {
    if (window.confirm('盤面をリセットしますか？')) {
      dispatch({ type: 'resetGame', message: '' });
      dispatch({ type: 'drawTile', message: '' });
    }
  };

  return (
    <GameSceneBase
      backToTitle={() => dispatch({ type: 'BackToTitle', message: '' })}
      resetGame={resetGame}
    />
  );
};

export default GameScene;
