import React, { useContext } from 'react';
import TitleScene from 'shine/TitleScene';
import GameScene from 'shine/GameScene';
import SimulationScene from 'shine/SimulationScene';
import useStore from './store';
import './css/base.css';
import { ApplicationContext } from 'context';

const SceneSelector: React.FC = () => {
  const { applicationMode } = useContext(ApplicationContext);

  switch (applicationMode) {
    case 'Title':
        return <TitleScene />;
    case 'Game':
      return <GameScene />;
    case 'Simulation':
      return <SimulationScene />;
    default:
      return <></>;
  }
};

const App: React.FC = () => {
  const state = useStore();

  return (<ApplicationContext.Provider value={state}>
      <SceneSelector />
    </ApplicationContext.Provider>);
};

export default App;
