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
