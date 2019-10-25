export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'resetGame'
  | 'drawTile'
  | 'trashTile'
  | 'selectUnit'
  | 'selectMember';

export interface Action {
  type: ActionType;
  message: string;
}
