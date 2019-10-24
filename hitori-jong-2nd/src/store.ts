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

  // ゲーム画面における手牌
  const [myHandG] = useState<Hand>(loadSetting<Hand>(
    'MyHandG',
    DEFAULT_HAND,
  ) as Hand);

  // シミュレーション画面における手牌
  const [myHandS] = useState<Hand>(loadSetting<Hand>(
    'MyHandS',
    DEFAULT_HAND,
  ) as Hand);

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
    myHandG,
    myHandS,
    dispatch,
  };
};

export default useStore;
