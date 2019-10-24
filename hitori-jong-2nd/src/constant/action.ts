export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'resetGame'
  | 'drawTile'
  | 'selectUnit'
  | 'selectMember';

export interface Action {
  type: ActionType;
  message: string;
}
