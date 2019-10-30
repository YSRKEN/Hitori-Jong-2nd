export const APPLICATION_NAME = 'ヒトリジャン';
export const APPLICATION_VERSION = '2.0.0 β';
export const AUTHOR_URL = 'https://twitter.com/YSRKEN';
export const PROJECT_URL = 'https://github.com/YSRKEN/Hitori-Jong-2nd';
export const README_URL =
  'https://github.com/YSRKEN/Hitori-Jong-2nd/wiki/取扱説明書';

export type ApplicationMode =
  | 'Title'
  | 'Game'
  | 'Simulation'
  | 'Trash'
  | 'KanaKeyBoard'
  | 'IdolSelector'
  | 'UnitData'
  | 'WantedIdol';

export const KANA_LIST =
  'あいうえおかきくけこさしすせそたちつてとなにぬねのはひふへほまみむめもや　ゆ　よらりるれろわ　を　ん';

// 手牌(13枚)
export interface Hand {
  unit: number[]; // チーないし固定しているユニット(UnitInfo2型と対応)
  member: number[]; // ユニットを組んでないメンバー。ツモ牌は最後の牌とする
}

export const DEFAULT_HAND_S: Hand = {
  unit: [125, 54],
  member: [2, 3, 7, 10, 11, 12],
};

export const DEFAULT_HAND_G: Hand = {
  unit: [125, 54],
  member: [2, 3, 7, 10, 11, -1],
};

// 手牌の枚数
export const HAND_TILE_COUNT = 12;
export const HAND_TILE_COUNT_PLUS = 13;

// 各タイル毎の枚数
export const TILE_COUNT = 3;

// 参加者の人数
export const PRODUCER_COUNT = 4;

// 参加者ののうち、自分自身の番号
export const USER_MEMBER_INDEX = 0;

// 参加者の名称
export const USER_NAME_LIST = ['自分', '上家', '対面', '下家'];

// 100万点(アガリ判定用の番兵)
export const MILLION_SCORE = 1000000;

// 計算結果を格納するための型
export interface ScoreResult {
  score: number;
  unit: number[];
  myIdolFlg: boolean;
}
export const ZERO_SCORE: ScoreResult = { score: 0, unit: [], myIdolFlg: false };
