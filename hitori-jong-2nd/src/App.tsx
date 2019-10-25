import React, { useContext } from 'react';
import TitleScene from 'scene/Title';
import GameScene from 'scene/Game';
import SimulationScene from 'scene/Simulation';
import useStore from 'store';
import { ApplicationContext } from 'context';
import TrashScene from 'scene/Trash';

const SceneSelector: React.FC = () => {
  const { applicationMode } = useContext(ApplicationContext);

  switch (applicationMode) {
    case 'Title':
      return <TitleScene />;
    case 'Game':
      return <GameScene />;
    case 'Simulation':
      return <SimulationScene />;
    case 'Trash':
      return <TrashScene />;
    default:
      return <></>;
  }
};

const App: React.FC = () => {
  const state = useStore();

  return (
    <ApplicationContext.Provider value={state}>
      <SceneSelector />
    </ApplicationContext.Provider>
  );
};

export default App;
