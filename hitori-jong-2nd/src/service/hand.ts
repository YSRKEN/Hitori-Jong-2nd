import { SORA_ID, IDOL_LIST2 } from 'constant2/idol';
import { UNIT_LIST2 } from 'constant2/unit';
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
  console.log(hand.member.map(id => IDOL_LIST2[id].name));
  console.log(trashedTile);
  console.log(unitId);
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
    newMember.push(member);
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
