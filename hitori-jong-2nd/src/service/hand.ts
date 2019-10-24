import { Hand, HAND_TILE_COUNT, HAND_TILE_COUNT_PLUS } from '../constant/other';
import { UNIT_LIST2 } from 'constant2/unit';

// 数字の配列(12枚)を手牌としてあてがう
export const createHandFromArray = (handArray: number[]): Hand => {
  return {
    unit: [],
    member: [...handArray, -1],
  };
};

// 牌をツモる
export const drawTile = (hand: Hand, idolId: number): Hand => {
  return {
    unit: [...hand.unit],
    member: [...hand.member.slice(0, HAND_TILE_COUNT), idolId],
  };
};

// 手牌のうち、ユニットの開始位置と終了位置を調べる
export const calcUnitToIndex = (hand: Hand) => {
  const output: {begin: number, end: number}[] = [];
  let p = 0;
  for (const unitId of hand.unit) {
    const unitCount = UNIT_LIST2[unitId].count;
    output.push({begin: p, end: p + unitCount});
    p += unitCount;
  }
  return output;
};

// 手牌のうち、メンバーの位置を調べる
export const calcMemberToIndex = (hand: Hand) => {
  let p = 0;
  for (const unitId of hand.unit) {
    p += UNIT_LIST2[unitId].count;
  }
  const output: number[] = [];
  for (let i = p; i < HAND_TILE_COUNT_PLUS; i += 1) {
    output.push(i);
  }
  return output;
};

// 手牌のうち、選択されているユニットおよびメンバーについてのフラグを取得する
export const calcSelectedFlg = (hand: Hand, selectedTileFlg: boolean[]) => {
  // ユニット
  const selectedUnitFlg: boolean[] = [];
  for (const record of calcUnitToIndex(hand)) {
    if (selectedTileFlg.slice(record.begin, record.end).includes(true)) {
      selectedUnitFlg.push(true);
    } else {
      selectedUnitFlg.push(false);
    }
  }

  // メンバー
  const selectedMemberFlg: boolean[] = [];
  for (const index of calcMemberToIndex(hand)){
    selectedMemberFlg.push(selectedTileFlg[index]);
  }
  return { selectedUnitFlg, selectedMemberFlg };
};
