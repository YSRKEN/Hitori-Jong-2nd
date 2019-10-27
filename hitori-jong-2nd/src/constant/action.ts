export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'BackToGame'
  | 'BackToView'
  | 'resetGame'
  | 'ToKanaKeyBoard'
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
  | 'copyTile'
  | 'useSora'
  | 'selectTrash'
  | 'selectKana'
  | 'selectIdol';

export interface Action {
  type: ActionType;
  message: string;
}
