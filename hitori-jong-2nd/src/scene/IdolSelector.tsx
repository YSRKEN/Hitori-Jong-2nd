import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { IDOL_LIST2 } from 'constant2/idol';
import IdolTile from 'parts/idolTile';

// アイドル選択用の一覧
const IdolSelectorBase: React.FC<{
	idolList: number[];
	backToView: () => void;
	selectIdol: (id: number) => void;
}> = ({ idolList, backToView, selectIdol }) => (<>
	<div className="l-header">
		<button
			type="button"
			className="default-button back-title"
			onClick={backToView}
		>
			元の画面に戻る
		</button>
	</div>
	<div className="l-main-idol-selector">
		<table className="idol-list">
			<tbody>
				<tr>{idolList.map((id, index) => (
					<IdolTile key={index} id={id} selectedFlg={false} onClick={() => selectIdol(id)} />
				))
				}</tr>
			</tbody>
		</table>
	</div>
</>);

const IdolSelector: React.FC = () => {
	const { selectedKana, dispatch } = useContext(ApplicationContext);

	const selectIdol = (id: number) => dispatch({type: 'selectIdol', message: `${id}`});

	const idolList = IDOL_LIST2.filter(idol => idol.kana.substring(0, 1) === selectedKana).map(idol => idol.id);
	if (idolList.length === 1) {
		selectIdol(idolList[0]);
	}

	return <IdolSelectorBase
		idolList={idolList}
		backToView={() => dispatch({ type: 'BackToView', message: '' })}
		selectIdol={selectIdol}
	/>;
};

export default IdolSelector;
