import { createContext } from 'react';
import { Action } from 'constant/action';
import { ApplicationMode, Hand } from 'constant/other';

export interface ApplicationState {
  applicationMode: ApplicationMode;
  myHandG: Hand;
  myHandS: Hand;
  selectedUnitFlg: boolean[];
  selectedMemberFlg: boolean[];
  selectedKana: string;
  dispatch: (action: Action) => void;
}

export const ApplicationContext = createContext<ApplicationState>(
  {} as ApplicationState,
);
