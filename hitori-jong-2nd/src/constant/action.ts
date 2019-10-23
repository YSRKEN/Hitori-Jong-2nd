export type ActionType = 'TitleToGame' | 'TitleToSimulation' | 'BackToTitle';

export interface Action {
	type: ActionType;
	message: string;
}
