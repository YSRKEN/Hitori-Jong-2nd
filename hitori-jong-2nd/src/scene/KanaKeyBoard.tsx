import React, { useContext } from 'react';
import { ApplicationContext } from 'context';

const KanaKeyBoardBase: React.FC<{
	selectKana: (kana: string) => void;
	backToView: () => void;
}> = ({ selectKana, backToView }) => (<>
	<div className="l-header">
		<button
			type="button"
			className="default-button back-title"
			onClick={backToView}
		>
			元の画面に戻る
      </button>
	</div>
	<div>
		<button onClick={() => selectKana('あ')}>あ</button>
	</div>
</>);

const KanaKeyBoard: React.FC = () => {
	const { dispatch } = useContext(ApplicationContext);

	return (<KanaKeyBoardBase
		selectKana={(kana: string) => dispatch({ type: 'selectKana', message: kana })}
		backToView={() => dispatch({type: 'BackToView', message: ''})}
	/>);
};

export default KanaKeyBoard;
