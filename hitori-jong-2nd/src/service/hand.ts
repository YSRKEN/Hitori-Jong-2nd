import { SORA_ID, IDOL_LIST2 } from 'constant2/idol';
import { UNIT_LIST2, UNIT_LIST2_WITHOUT_CHI } from 'constant2/unit';
import {
  Hand,
  HAND_TILE_COUNT,
  HAND_TILE_COUNT_PLUS,
  MILLION_SCORE,
  ScoreResult,
  ZERO_SCORE,
} from '../constant/other';
import { sum, calcArrayDiff } from './utility';

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
    member: [...hand.member.slice(0, hand.member.length - 1), idolId],
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

// ユニットを結成
export const injectUnit = (hand: Hand, selectedMemberFlg: boolean[]): Hand => {
  // 選択された手牌を取り出す
  const member = hand.member.filter((_, index) => selectedMemberFlg[index]);

  // 選択された手牌について、当てはまるユニットがあるかを調べる
  const memberSet = new Set(member);
  const unit = UNIT_LIST2.filter(unitInfo => {
    if (unitInfo.member.length !== member.length) {
      return false;
    }

    return (
      unitInfo.member.filter(id => memberSet.has(id)).length === member.length
    );
  });

  // ユニットがあるかによって条件分岐
  if (unit.length > 0) {
    const newMember: number[] = [];
    const temp = new Set<number>();
    hand.member.forEach(id => {
      if (memberSet.has(id) && !temp.has(id)) {
        temp.add(id);

        return;
      }
      newMember.push(id);
    });

    return {
      unit: [...hand.unit, unit[0].id],
      member: newMember,
    };
  }

  return {
    unit: [...hand.unit],
    member: [...hand.member],
  };
};

// ユニットを解除
export const ejectUnit = (hand: Hand, selectedUnitFlg: boolean[]): Hand => {
  const newUnit: number[] = [];
  const newMember: number[] = [];

  for (let ui = 0; ui < hand.unit.length; ui += 1) {
    if (selectedUnitFlg[ui]) {
      for (const member of UNIT_LIST2[hand.unit[ui]].member) {
        newMember.push(member);
      }
    } else {
      newUnit.push(hand.unit[ui]);
    }
  }
  for (const member of hand.member) {
    newMember.push(member);
  }

  return {
    unit: newUnit,
    member: newMember,
  };
};

// 早坂そらを使用した後の手牌を返す
export const soraFunc = (hand: Hand, idolId: number): Hand => {
  const newMember: number[] = [];
  let soraFlg = false;
  hand.member.forEach(id => {
    if (id !== SORA_ID) {
      newMember.push(id);
    } else if (!soraFlg) {
      soraFlg = true;
      newMember.push(idolId);
    } else {
      newMember.push(id);
    }
  });

  return {
    unit: [...hand.unit],
    member: newMember,
  };
};

// 指定した位置の手牌を指定した牌と入れ替える
export const selectIdolFunc = (
  hand: Hand,
  memberIndex: number,
  idolId: number,
): Hand => {
  const newMember = [...hand.member];
  newMember[memberIndex] = idolId;

  return {
    unit: [...hand.unit],
    member: newMember,
  };
};

// 指定した牌を引き込んで、指定したユニットでチーする
export const chiTile = (
  hand: Hand,
  trashedTile: number,
  unitId: number,
): Hand => {
  const temp = new Set<number>();
  const newMember = Array<number>();
  const unitMemberSet = new Set(UNIT_LIST2[unitId].member);
  for (const member of hand.member) {
    if (
      member !== trashedTile &&
      unitMemberSet.has(member) &&
      !temp.has(member)
    ) {
      temp.add(member);
      continue;
    }
    if (member >= 0) {
      newMember.push(member);
    }
  }

  return {
    unit: [...hand.unit, unitId],
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

// 手牌を文字列化する
export const handToString = (hand: Hand) => {
  let output = `手牌枚数：${countHand(hand)}枚\n`;
  output += `ユニット：${hand.unit.map(
    id => UNIT_LIST2[id].name + (UNIT_LIST2[id].chiFlg ? '(チー)' : ''),
  )}\n`;
  output += `残メンバー：${hand.member.map(id =>
    id >= 0 ? IDOL_LIST2[id].name : '■',
  )}`;

  return output;
};

// その牌でチーした場合のユニット一覧を返す
export const calcChiUnitList = (hand: Hand, addingIdolId: number): number[] => {
  const memberSet = new Set(hand.member);

  return UNIT_LIST2.filter(unitInfo => {
    // ユニットは3枚以上か？(チーできるユニットか？)
    if (!unitInfo.chiFlg) {
      return false;
    }
    // 引き込んだ牌を使ったチーか？
    if (!unitInfo.member.includes(addingIdolId)) {
      return false;
    }
    // 残りの牌が手牌に全て含まれるか？
    if (
      unitInfo.member.filter(id => id !== addingIdolId && !memberSet.has(id))
        .length > 0
    ) {
      return false;
    }

    return true;
  }).map(unitInfo => unitInfo.id);
};

// 担当フラグを考慮したスコア計算
const scoreWithMyidol = (scoreResult: ScoreResult) => {
  return scoreResult.myIdolFlg ? scoreResult.score + 2000 : scoreResult.score;
};

// 最高得点となるスコアとユニット一覧を返す(担当どうでもいい版)
const calcScoreAndUnit = (
  freeMember: number[],
  unitList = UNIT_LIST2_WITHOUT_CHI,
  preScore = ZERO_SCORE,
): ScoreResult => {
  // 適合するユニット一覧を抽出する
  const freeMemberSet = new Set(freeMember);
  const filteredUnitList = unitList.filter(unit => {
    for (const member of unit.member) {
      if (!freeMemberSet.has(member)) {
        return false;
      }
    }

    return true;
  });

  // DFSにより、よりスコアが高い組を見つける
  let maxScore = preScore;
  for (const unit of filteredUnitList) {
    // 当該ユニットを取り去った後の手牌を算出する
    const freeMember2 = calcArrayDiff(freeMember, unit.member);
    // アガリ形だった場合の処理
    if (freeMember2.length === 0) {
      const result: ScoreResult = {
        score: preScore.score + unit.score + MILLION_SCORE,
        unit: [...preScore.unit, unit.id],
        myIdolFlg: false,
      };
      if (maxScore.score < result.score) {
        maxScore = result;
      }
    } else {
      // アガリ形ではないので、1段深く検索するための準備を行う
      const preScore2: ScoreResult = {
        score: preScore.score + unit.score,
        unit: [...preScore.unit, unit.id],
        myIdolFlg: false,
      };
      // 検索する
      const result = calcScoreAndUnit(freeMember2, filteredUnitList, preScore2);
      if (maxScore.score < result.score) {
        maxScore = result;
      }
    }
  }

  return maxScore;
};

// 最高得点となるスコアとユニット一覧を返す(担当気にする版)
const calcScoreAndUnitWithMyIdol = (
  freeMember: number[],
  myIdolUnitSet: Set<number>,
  unitList = UNIT_LIST2_WITHOUT_CHI,
  preScore = ZERO_SCORE,
): ScoreResult => {
  // 適合するユニット一覧を抽出する
  const freeMemberSet = new Set(freeMember);
  const filteredUnitList = unitList.filter(unit => {
    for (const member of unit.member) {
      if (!freeMemberSet.has(member)) {
        return false;
      }
    }

    return true;
  });

  // DFSにより、よりスコアが高い組を見つける
  let maxScore = preScore;
  for (const unit of filteredUnitList) {
    // 当該ユニットを取り去った後の手牌を算出する
    const freeMember2 = calcArrayDiff(freeMember, unit.member);
    const myIdolUnitFlg = myIdolUnitSet.has(unit.id);

    // アガリ形だった場合の処理
    if (freeMember2.length === 0) {
      const result: ScoreResult = {
        score: preScore.score + unit.score + MILLION_SCORE,
        unit: [...preScore.unit, unit.id],
        myIdolFlg: preScore.myIdolFlg || myIdolUnitFlg,
      };
      if (scoreWithMyidol(maxScore) < scoreWithMyidol(result)) {
        maxScore = result;
      }
    } else {
      // アガリ形ではないので、1段深く検索するための準備を行う
      const preScore2: ScoreResult = {
        score: preScore.score + unit.score,
        unit: [...preScore.unit, unit.id],
        myIdolFlg: preScore.myIdolFlg || myIdolUnitFlg,
      };
      // 検索する
      const result = calcScoreAndUnitWithMyIdol(
        freeMember2,
        myIdolUnitSet,
        filteredUnitList,
        preScore2,
      );
      if (scoreWithMyidol(maxScore) < scoreWithMyidol(result)) {
        maxScore = result;
      }
    }
  }

  return maxScore;
};

// その牌でツモ/ロンした場合のスコアとユニット一覧を返す
// (アガリ形の場合、スコア＝score % 1000000となる)
export const calcScoreAndUnitForHand = (
  hand: Hand,
  addingIdolId: number,
  myIdol: number,
): ScoreResult => {
  // 担当が含まれるユニット一覧を取得する
  const myIdolUnitSet = new Set(
    UNIT_LIST2.filter(unit => unit.member.includes(myIdol)).map(
      unit => unit.id,
    ),
  );

  // 既存のユニットに担当が含まれるかを調べる
  let myIdolFlg = false;
  for (const unitId of hand.unit) {
    if (myIdolUnitSet.has(unitId)) {
      myIdolFlg = true;
      break;
    }
  }

  // フリーな手牌と追加手牌とで最高得点の組み合わせを探す
  const freeMember = [...hand.member];
  freeMember[freeMember.length - 1] = addingIdolId;
  const result =
    myIdolFlg || !freeMember.includes(myIdol)
      ? calcScoreAndUnit(freeMember)
      : calcScoreAndUnitWithMyIdol(freeMember, myIdolUnitSet);

  const temp: ScoreResult = {
    score:
      sum(hand.unit.map(unitId => UNIT_LIST2[unitId].score)) + result.score,
    unit: [...hand.unit, ...result.unit],
    myIdolFlg: myIdolFlg || result.myIdolFlg,
  };

  return {
    score: scoreWithMyidol(temp),
    unit: temp.unit,
    myIdolFlg: temp.myIdolFlg,
  };
};

// ユニットについての情報を取得する
export const calcUnitData = (
  hand: Hand,
): { unit0: number[]; unit1: number[]; unit2: number[] } => {
  const memberSet = new Set(hand.member.filter(id => id >= 0));

  // 全て揃っているユニット、1枚だけ足りないユニット、2枚足りないユニットについての情報を記録する
  const unit0: number[] = [];
  const unit1: number[] = [];
  const unit2: number[] = [];
  UNIT_LIST2_WITHOUT_CHI.forEach(unitInfo => {
    const wantedMember = unitInfo.member.filter(id => !memberSet.has(id));
    switch (wantedMember.length) {
      case 0:
        unit0.push(unitInfo.id);
        break;
      case 1:
        unit1.push(unitInfo.id);
        break;
      case 2:
        unit2.push(unitInfo.id);
        break;
      default:
        break;
    }
  });

  // それぞれについて、元のメンバーの人数によって並び替えを実施
  unit0.sort(
    (a, b) => UNIT_LIST2[b].member.length - UNIT_LIST2[a].member.length,
  );
  unit1.sort(
    (a, b) => UNIT_LIST2[b].member.length - UNIT_LIST2[a].member.length,
  );
  unit2.sort(
    (a, b) => UNIT_LIST2[b].member.length - UNIT_LIST2[a].member.length,
  );

  return { unit0, unit1, unit2 };
};
