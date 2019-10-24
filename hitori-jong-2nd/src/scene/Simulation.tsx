import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import MyHandTileList from 'parts/MyHandTileList';

// シミュレーション画面
const SimulationSceneBase: React.FC<{
  backToTitle: () => void;
}> = ({ backToTitle }) => (
  <>
    <div className="l-header">
      <button
        type="button"
        className="default-button back-title"
        onClick={backToTitle}
      >
        タイトルに戻る
      </button>
    </div>
    <div className="l-footer">
      <MyHandTileList />
    </div>
  </>
);

const SimulationScene: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  return (
    <SimulationSceneBase
      backToTitle={() => dispatch({ type: 'BackToTitle', message: '' })}
    />
  );
};

export default SimulationScene;
