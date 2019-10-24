import { IdolType, IDOL_LIST } from "../constant/idol";

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
		const name = idolInfo.name;
		const kana = idolInfo.kana;
		const idolType = idolInfo.type;
		const fontSize = name.length >= 4 ? 'small' : 'normal';
		return {id, name, kana, 'type': idolType, fontSize};
	});
};

export const IDOL_LIST2 = createIdolInfo2();
