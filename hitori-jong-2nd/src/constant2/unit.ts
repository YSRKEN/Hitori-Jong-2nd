import { UNIT_LIST } from "../constant/unit";
import { IDOL_LIST } from "../constant/idol";

// ユニットの情報(詳細)
export interface UnitInfo2 {
	id: number;
	name: string;
	member: number[];
	count: number;
	chiFlg: boolean;
}

// UnitInfo2型の一覧を生成する
const createUnitInfo2 = () => {
	// アイドル名→アイドルIDの変換表
	const nameToId: {[key: string]: number} = {};
	IDOL_LIST.map((idolInfo, id) => {
		nameToId[idolInfo.name] = id;
	});

	// ユニット一覧
	const output: UnitInfo2[] = [];
	UNIT_LIST.map((unitInfo, id) => {
		const name = unitInfo.name;
		const member = unitInfo.member.map(name => nameToId[name]);
		const count = member.length;
		output.push({id, name, 'member': [...member], count, chiFlg: false});
		if (member.length >= 3) {
			output.push({id, 'name': `${name}(チー)`, 'member': [...member], count, chiFlg: true});
		}
	});
	return output;
};

export const UNIT_LIST2 = createUnitInfo2();

console.log(UNIT_LIST2);
