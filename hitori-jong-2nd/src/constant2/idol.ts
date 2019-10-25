import { IdolType, IDOL_LIST } from '../constant/idol';

// アイドルの情報(詳細)
export interface IdolInfo2 {
  id: number;
  name: string;
  kana: string;
  type: IdolType;
  fontSize: string;
}

// IdolInfo2型の一覧を生成する
const createIdolInfo2 = () => {
  return IDOL_LIST.map((idolInfo, id) => {
    const { name } = idolInfo;
    const { kana } = idolInfo;
    const idolType = idolInfo.type;
    const fontSize = name.length >= 4 ? 'small' : 'normal';

    return { id, name, kana, type: idolType, fontSize };
  });
};

export const IDOL_LIST2 = createIdolInfo2();
export const SORA_ID = IDOL_LIST.findIndex(
  idolInfo => idolInfo.name === 'そら',
);
