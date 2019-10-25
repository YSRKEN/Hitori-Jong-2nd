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
