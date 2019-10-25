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
    <div className="l-main-simulation">
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
        ユニット？
      </button>
      <button type="button" className="l-margin-right default-button command">
        受け入れ？
      </button>
      <button type="button" className="l-margin-right default-button command">
        何切る？
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
