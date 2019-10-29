import { createContext } from 'react';
import { Action } from 'constant/action';
import { ApplicationMode, Hand, ScoreResult } from 'constant/other';

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
  wantedIdolData: {
    agari: {
      idol: number;
      result: ScoreResult;
    }[];
    chi: {
      idol: number;
      unit: number;
    }[];
  };
  dispatch: (action: Action) => void;
}

export const ApplicationContext = createContext<ApplicationState>(
  {} as ApplicationState,
);
