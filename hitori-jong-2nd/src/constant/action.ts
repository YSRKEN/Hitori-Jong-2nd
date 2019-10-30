export type ActionType =
  | 'TitleToGame'
  | 'TitleToSimulation'
  | 'BackToTitle'
  | 'BackToGame'
  | 'BackToSimulation'
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
  | 'selectIdol'
  | 'judgeUnit'
  | 'changeUnitDataFilterFlg'
  | 'judgeWantedIdol'
  | 'showUnitInfo';

export interface Action {
  type: ActionType;
  message: string;
}
