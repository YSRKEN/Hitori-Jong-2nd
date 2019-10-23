import React, { useContext } from 'react';
import { ApplicationContext } from 'context';

// シミュレーション画面
const SimulationSceneBase: React.FC<{backToTitle: () => void}> = ({backToTitle}) => (<>
	<div className="l-header">
		<button type="button" className="button-back-title" onClick={backToTitle}>タイトルに戻る</button>
	</div>
	<h1>シミュレーション画面</h1>
</>);

const SimulationScene: React.FC = () => {
	const { dispatch } = useContext(ApplicationContext);
	return <SimulationSceneBase backToTitle={() => dispatch({type: 'BackToTitle', message: ''})} />;
};

export default SimulationScene;
