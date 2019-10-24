export const APPLICATION_NAME = 'ヒトリジャン';
export const APPLICATION_VERSION = '2.0.0 α';
export const AUTHOR_URL = 'https://twitter.com/YSRKEN';
export const PROJECT_URL = 'https://github.com/YSRKEN/Hitori-Jong-2nd';
export const README_URL =
  'https://github.com/YSRKEN/Hitori-Jong-2nd/wiki/取扱説明書';

export type ApplicationMode = 'Title' | 'Game' | 'Simulation';

export const KANA_LIST =
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや　ゆ　よらりるれろわ　を　ん';

// 手牌(13枚)
export interface Hand {
  unit: number[]; // チーないし固定しているユニット(UnitInfo2型と対応)
  member: number[]; // ユニットを組んでないメンバー。ツモ牌は最後の牌とする
}

export const DEFAULT_HAND: Hand = {
  unit: [125, 54],
  member: [2, 3, 7, 10, 11, 12],
};
