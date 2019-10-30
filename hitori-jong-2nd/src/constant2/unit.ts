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
export const UNIT_LIST2_WITHOUT_CHI = UNIT_LIST2.filter(
  unit => unit.chiFlg === false,
);

// シャンテン数分析用の情報
export interface UnitInfo3 {
  id: number;
  unitId: number;
  includingMember: number[];
  idolCount: number;
  wantedIdolCount: number;
};

// UnitInfo3型の一覧を生成する
const createUnitInfo3 = () => {
  // アイドル名→アイドルIDの変換表
  const nameToId: { [key: string]: number } = {};
  IDOL_LIST.forEach((idolInfo, id) => {
    nameToId[idolInfo.name] = id;
  });

  // ユニット一覧
  const output: UnitInfo3[] = [];
  UNIT_LIST.forEach((unitInfo, index) => {
    const unitId = index;
    const member = unitInfo.member.map(idolName => nameToId[idolName]);
    const idolCount = member.length;

    // 足りている場合のパターン
    output.push({
      id: 0,
      unitId,
      includingMember: [...member],
      idolCount,
      wantedIdolCount: 0
    });

    // 1枚足りない場合のパターン
    for (let mi = 0; mi < member.length; mi += 1) {
      const member2 = member.filter((_, index) => index !== mi);
      output.push({
        id: 0,
        unitId,
        includingMember: [...member2],
        idolCount,
        wantedIdolCount: 1
      });
    }

    // 2枚足りない場合のパターン
    if (member.length >= 2) {
      for (let mi1 = 0; mi1 < member.length - 1; mi1 += 1) {
        for (let mi2 = mi1 + 1; mi2 < member.length; mi2 += 1) {
          const member3 = member.filter((_, index) => index !== mi1 && index !== mi2);
          output.push({
            id: 0,
            unitId,
            includingMember: [...member3],
            idolCount,
            wantedIdolCount: 2
          });
        }
      }
    }
  });

  output.sort((a, b) => {
    const temp1 = a.wantedIdolCount - b.wantedIdolCount;
    const temp2 = b.idolCount - a.idolCount;
    return temp1 * 100 + temp2;
  });

  return output.map((record, index) => {
    return {
      id: index,
      unitId: record.unitId,
      includingMember: [...record.includingMember],
      idolCount: record.idolCount,
      wantedIdolCount: record.wantedIdolCount
    }
  });
};

export const UNIT_LIST3 = createUnitInfo3();
export const UNIT_LIST3_SIIKA = UNIT_LIST3.findIndex(unit => UNIT_LIST[unit.unitId].name === '(詩花)' && unit.wantedIdolCount === 1);
console.log(UNIT_LIST3);
