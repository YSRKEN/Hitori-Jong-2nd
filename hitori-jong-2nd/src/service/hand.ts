import { Hand } from '../constant/other';

// 数字の配列(12枚)を手牌として
export const createHandFromArray = (handArray: number[]): Hand => {
  return {
    unit: [],
    member: [...handArray, -1],
  };
};
