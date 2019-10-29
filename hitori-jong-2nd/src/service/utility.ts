import { loadSetting, saveSetting } from 'service/setting';
import { PRODUCER_COUNT, ScoreResult } from 'constant/other';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';

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

// 要素の総和を求める
export const sum = (a: number[]) => {
  let output = 0;
  for (const record of a) {
    output += record;
  }

  return output;
};

// 要素の引き算を実施する
export const calcArrayDiff = (a: number[], b: number[]) => {
  const bSet = new Set<number>(b);
  const temp = new Set<number>();
  const result = new Array<number>();
  for (const n of a) {
    if (bSet.has(n) && !temp.has(n)) {
      temp.add(n);
      continue;
    }
    result.push(n);
  }

  return result;
};

// スコアの計算結果を文字列化する
export const scoreResultToString = (scoreResult: ScoreResult) => {
  let output = '手役：\n';
  scoreResult.unit.forEach(unitId => {
    const unitInfo = UNIT_LIST2[unitId];
    output += `・${unitInfo.score}点　${unitInfo.name}`;
    if (unitInfo.chiFlg) {
      output += '(チー)';
    }
    output += `　${unitInfo.member.map(memberId => IDOL_LIST2[memberId].name)}`;
    output += '\n';
  })
  return output;
}