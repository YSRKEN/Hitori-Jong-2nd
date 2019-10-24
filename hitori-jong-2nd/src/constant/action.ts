export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'resetGame';

export interface Action {
  type: ActionType;
  message: string;
}
