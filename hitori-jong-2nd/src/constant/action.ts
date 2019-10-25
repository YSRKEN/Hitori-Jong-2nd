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
  | 'showTrash'
  | 'shiftLeft'
  | 'swapTile'
  | 'shiftRight'
  | 'injectUnit'
  | 'ejectUnit'
  | 'copyTile';

export interface Action {
  type: ActionType;
  message: string;
}
