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
  myIdol: number;
  unitData: { unit0: number[]; unit1: number[]; unit2: number[] };
  unitDataFilterFlg: boolean;
  dispatch: (action: Action) => void;
}

export const ApplicationContext = createContext<ApplicationState>(
  {} as ApplicationState,
);
