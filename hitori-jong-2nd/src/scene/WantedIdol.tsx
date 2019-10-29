import React, { useContext } from 'react';
import { ApplicationContext } from 'context';

const WantedIdolScene: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const backToSimulation = () =>
    dispatch({ type: 'BackToSimulation', message: '' });

  return (
    <div className="l-header">
      <button
        type="button"
        className="l-margin-right default-button back-title"
        onClick={backToSimulation}
      >
        シミュレーション画面に戻る
      </button>
    </div>
  );
};

export default WantedIdolScene;
