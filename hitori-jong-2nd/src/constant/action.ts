export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'BackToGame'
  | 'resetGame'
  | 'drawTile'
  | 'trashTile'
  | 'selectUnit'
  | 'selectMember'
  | 'moveOtherProducer'
  | 'showTrash';

export interface Action {
  type: ActionType;
  message: string;
}
