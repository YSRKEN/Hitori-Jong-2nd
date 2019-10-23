import React, { useContext } from 'react';
import { ApplicationContext } from 'context';

// ゲーム画面
const GameSceneBase: React.FC<{backToTitle: () => void}> = ({backToTitle}) => (<>
	<button onClick={backToTitle}>タイトルに戻る</button>
	<h1>ゲーム画面</h1>
</>);

const GameScene: React.FC = () => {
	const { dispatch } = useContext(ApplicationContext);
	return <GameSceneBase backToTitle={() => dispatch({type: 'BackToTitle', message: ''})} />;
};

export default GameScene;
