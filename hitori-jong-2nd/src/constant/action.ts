export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'resetGame'
  | 'drawTile'
  | 'trashTile'
  | 'selectUnit'
  | 'selectMember'
  | 'moveOtherProducer';

export interface Action {
  type: ActionType;
  message: string;
}
