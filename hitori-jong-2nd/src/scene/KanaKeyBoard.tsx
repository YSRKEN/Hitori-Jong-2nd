import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { KANA_LIST } from 'constant/other';
import { IDOL_LIST2 } from 'constant2/idol';

interface KanaData {
	kana: string;
	disabled: boolean;
};

const KanaKey: React.FC<{
	kanaData: KanaData;
	selectKana: (kana: string) => void;
}> = ({ kanaData, selectKana }) => (<>{
	kanaData.disabled
		? <span className="kana-key is-key-disabled">{kanaData.kana}</span>
		: <button className="kana-key" onClick={() => selectKana(kanaData.kana)}>{kanaData.kana}</button>
}
</>);

const KanaKeyBoardBase: React.FC<{
	kanaList: KanaData[][];
	selectKana: (kana: string) => void;
	backToView: () => void;
}> = ({ kanaList, selectKana, backToView }) => (<>
	<div className="l-header">
		<button
			type="button"
			className="default-button back-title"
			onClick={backToView}
		>
			元の画面に戻る
		</button>
	</div>
	<div className="l-main-keyboard">
		<table className="l-margin-center kana-keyboard">
			<tbody>
				{kanaList.map((record, index) => (<tr key={index}>
					{record.map((kanaData, index2) => (<td key={index2}>
						<KanaKey kanaData={kanaData} selectKana={selectKana}/>
					</td>))}
				</tr>))}
			</tbody>
		</table>
	</div>
</>);

const KanaKeyBoard: React.FC = () => {
	const { dispatch } = useContext(ApplicationContext);

	// かな一覧を作成する
	const kanaList: KanaData[][] = [];
	for (let y = 0; y < 5; y += 1) {
		const temp: KanaData[] = [];
		for (let x = 0; x < 10; x += 1) {
			// かなを取り出す
			const p = (9 - x) * 5 + y;
			const kana = KANA_LIST.substring(p, p + 1);

			// 取り出したかなに対し、対応するアイドルがいるかを調べる
			const disabled = IDOL_LIST2.filter(idolInfo => idolInfo.kana.substring(0, 1) === kana).length === 0;
			temp.push({ kana, disabled });
		}
		kanaList.push(temp);
	}

	return (<KanaKeyBoardBase
		kanaList={kanaList}
		selectKana={(kana: string) => dispatch({ type: 'selectKana', message: kana })}
		backToView={() => dispatch({ type: 'BackToView', message: '' })}
	/>);
};

export default KanaKeyBoard;
