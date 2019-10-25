import { loadSetting, saveSetting } from 'service/setting';
import { PRODUCER_COUNT } from 'constant/other';

// リセット情報を取得する
// (dispatchから例外を送出できないので苦肉の策)
export const getResetFlg = () => {
  return loadSetting('ResetFlg', false);
};

// リセット情報を書き込む
// (dispatchから例外を送出できないので苦肉の策)
export const setResetFlg = (resetFlg: boolean) => {
  saveSetting('ResetFlg', resetFlg);
};

// 控え室を初期化する
export const resetTrashArea = () => {
  saveSetting('TrashTileArea', [
    Array<number>(),
    Array<number>(),
    Array<number>(),
    Array<number>(),
  ]);
};

// 控え室を取得する
export const getTrashArea = () => {
  return loadSetting<number[][]>('TrashTileArea', [
    Array<number>(),
    Array<number>(),
    Array<number>(),
    Array<number>(),
  ]);
};

// 控え室に牌を追加する
export const addTrashTile = (idolId: number, memberIndex: number) => {
  const trashArea = getTrashArea();
  // 控え室の状態を複製
  const temp: number[][] = [];
  for (let mi = 0; mi < PRODUCER_COUNT; mi += 1) {
    if (mi !== memberIndex) {
      temp.push([...trashArea[mi]]);
    } else {
      temp.push([...trashArea[mi], idolId]);
    }
  }
  saveSetting('TrashTileArea', temp);
};
