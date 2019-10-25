import { SORA_ID } from 'constant2/idol';
import { Hand, HAND_TILE_COUNT, HAND_TILE_COUNT_PLUS } from '../constant/other';

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

// 牌を切る
export const trashTile = (hand: Hand, memberIndex: number): Hand => {
  const newMember: number[] = [];
  for (let mi = 0; mi < hand.member.length; mi += 1) {
    if (mi !== memberIndex) {
      newMember.push(hand.member[mi]);
    }
  }
  newMember.push(-1);

  return {
    unit: [...hand.unit],
    member: newMember,
  };
};

// 選択した牌を左にシフト
export const shiftLeft = (hand: Hand, selectedMemberFlg: boolean[]) => {
  const newMember = [...hand.member];
  const newSelectedMemberFlg = [...selectedMemberFlg];
  for (let mi = 1; mi < hand.member.length; mi += 1) {
    if (selectedMemberFlg[mi]) {
      const temp = newMember[mi - 1];
      newMember[mi - 1] = newMember[mi];
      newMember[mi] = temp;
      const temp2 = newSelectedMemberFlg[mi - 1];
      newSelectedMemberFlg[mi - 1] = newSelectedMemberFlg[mi];
      newSelectedMemberFlg[mi] = temp2;
    }
  }
  const newHand = {
    unit: [...hand.unit],
    member: newMember,
  };

  return { newHand, newSelectedMemberFlg };
};

// 選択した牌を右にシフト
export const shiftRight = (hand: Hand, selectedMemberFlg: boolean[]) => {
  const newMember = [...hand.member];
  const newSelectedMemberFlg = [...selectedMemberFlg];
  for (let mi = hand.member.length - 2; mi >= 0; mi -= 1) {
    if (selectedMemberFlg[mi]) {
      const temp = newMember[mi + 1];
      newMember[mi + 1] = newMember[mi];
      newMember[mi] = temp;
      const temp2 = newSelectedMemberFlg[mi + 1];
      newSelectedMemberFlg[mi + 1] = newSelectedMemberFlg[mi];
      newSelectedMemberFlg[mi] = temp2;
    }
  }
  const newHand = {
    unit: [...hand.unit],
    member: newMember,
  };

  return { newHand, newSelectedMemberFlg };
};

// 選択した牌を交換
export const swapTile = (hand: Hand, selectedMemberFlg: boolean[]): Hand => {
  // 選択した位置を調べる
  const pos1 = selectedMemberFlg.indexOf(true);
  let pos2 = pos1;
  for (let mi = pos1 + 1; mi < hand.member.length; mi += 1) {
    if (selectedMemberFlg[mi]) {
      pos2 = mi;
      break;
    }
  }

  // 交換を実施
  const newMember = [...hand.member];
  const temp = newMember[pos1];
  newMember[pos1] = newMember[pos2];
  newMember[pos2] = temp;

  return {
    unit: [...hand.unit],
    member: newMember,
  };
};

// 手牌をカウントする
export const countHand = (hand: Hand) => {
  if (hand.member[hand.member.length - 1] < 0) {
    return HAND_TILE_COUNT;
  }

  return HAND_TILE_COUNT_PLUS;
};

// そらさんを持っていたらtrue
export const hasSora = (hand: Hand) => {
  return hand.member.includes(SORA_ID);
};
