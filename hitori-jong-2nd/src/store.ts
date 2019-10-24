import { useState } from 'react';
import { loadSetting, saveSetting } from 'service/setting';
import { ApplicationMode, DEFAULT_HAND, Hand } from './constant/other';
import { Action } from './constant/action';
import { ApplicationState } from './context';
import { IDOL_LIST2 } from './constant2/idol';
import { UNIT_LIST2 } from './constant2/unit';

const useStore = (): ApplicationState => {
  // アプリケーションの動作モード
  const [applicationMode, setApplicationMode] = useState<ApplicationMode>(
    loadSetting<ApplicationMode>('ApplicationMode', 'Title') as ApplicationMode,
  );
  const setApplicationMode2 = (mode: ApplicationMode) => {
    setApplicationMode(mode);
    saveSetting('ApplicationMode', mode);
  };

  // シミュレーション画面における手牌
  const [myHandS] = useState<Hand>(DEFAULT_HAND);

  // dispatch
  const dispatch = (action: Action) => {
    console.log(IDOL_LIST2);
    console.log(UNIT_LIST2);

    switch (action.type) {
      case 'TitleToGame':
        setApplicationMode2('Game');
        break;
      case 'TitleToSimulation':
        setApplicationMode2('Simulation');
        break;
      case 'BackToTitle':
        setApplicationMode2('Title');
        break;
      default:
        break;
    }
  };

  return {
    applicationMode,
    myHandS,
    dispatch,
  };
};

export default useStore;
