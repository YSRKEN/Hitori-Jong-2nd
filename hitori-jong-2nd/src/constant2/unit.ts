import { UNIT_LIST } from '../constant/unit';
import { IDOL_LIST } from '../constant/idol';

// ユニットの情報(詳細)
export interface UnitInfo2 {
  id: number;
  name: string;
  member: number[];
  chiFlg: boolean;
  count: number;
  score: number;
}

// 得点計算
const calcScore = (length: number) => {
  if (length <= 1) {
    return 1000;
  }

  return (length - 1) * 2000;
};

// UnitInfo2型の一覧を生成する
const createUnitInfo2 = () => {
  // アイドル名→アイドルIDの変換表
  const nameToId: { [key: string]: number } = {};
  IDOL_LIST.forEach((idolInfo, id) => {
    nameToId[idolInfo.name] = id;
  });

  // ユニット一覧
  const output: UnitInfo2[] = [];
  let id = 0;
  UNIT_LIST.forEach(unitInfo => {
    const { name } = unitInfo;
    const member = unitInfo.member.map(idolName => nameToId[idolName]);
    const count = member.length;
    const score = calcScore(count);
    output.push({ id, name, member: [...member], chiFlg: false, count, score });
    id += 1;
    if (member.length >= 3) {
      output.push({
        id,
        name,
        member: [...member],
        chiFlg: true,
        count,
        score: calcScore(count - 1),
      });
      id += 1;
    }
  });

  return output;
};

export const UNIT_LIST2 = createUnitInfo2();
