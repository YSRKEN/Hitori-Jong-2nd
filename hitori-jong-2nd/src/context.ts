import { createContext } from 'react';
import { Action } from "./constant/action";
import { ApplicationMode } from "./constant/other";

export interface ApplicationState {
	applicationMode: ApplicationMode;
	dispatch: (action: Action) => void;
};

export const ApplicationContext = createContext<ApplicationState>({} as ApplicationState);
