import { loadSetting, saveSetting } from 'service/setting';
import { PRODUCER_COUNT } from 'constant/other';

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

// 控え室から牌を拾う(チー用)
export const getMemberFromTrashAreaAsChi = (pid: number) => {
  const trashArea = getTrashArea();
  // 控え室の状態を複製
  const temp: number[][] = [];
  for (let mi = 0; mi < PRODUCER_COUNT; mi += 1) {
    if (mi !== pid) {
      temp.push([...trashArea[mi]]);
    } else {
      temp.push([...trashArea[mi]].slice(0, trashArea[mi].length - 1));
    }
  }
  saveSetting('TrashTileArea', temp);
};

// 控え室から牌を拾う(早坂そら用)
export const getMemberFromTrashArea = (pid: number, idolId: number) => {
  const trashArea = getTrashArea();
  // 控え室の状態を複製
  const temp: number[][] = [];
  for (let mi = 0; mi < PRODUCER_COUNT; mi += 1) {
    if (mi !== pid) {
      temp.push([...trashArea[mi]]);
    } else {
      let flg = false;
      const temp2: number[] = [];
      for (const member of trashArea[mi]) {
        if (member === idolId && !flg) {
          flg = true;
        } else {
          temp2.push(member);
        }
      }
      temp.push(temp2);
    }
  }
  saveSetting('TrashTileArea', temp);
};
