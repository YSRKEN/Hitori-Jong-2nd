import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import useStore from 'store';
import TitleScene from 'scene/Title';
import GameScene from 'scene/Game';
import SimulationScene from 'scene/Simulation';
import TrashScene from 'scene/Trash';
import KanaKeyBoard from 'scene/KanaKeyBoard';
import IdolSelector from 'scene/IdolSelector';
import UnitDataScene from 'scene/UnitData';
import WantedIdolScene from 'scene/WantedIdol';

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
    case 'KanaKeyBoard':
      return <KanaKeyBoard />;
    case 'IdolSelector':
      return <IdolSelector />;
    case 'UnitData':
      return <UnitDataScene />;
    case 'WantedIdol':
      return <WantedIdolScene />;
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
