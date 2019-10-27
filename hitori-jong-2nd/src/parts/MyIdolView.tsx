import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { IdolInfo2, IDOL_LIST2 } from 'constant2/idol';

const MyIdolViewBase: React.FC<{idolInfo: IdolInfo2, onClick: () => void}> = ({idolInfo, onClick}) => (
	<button className={`l-margin-right default-button my-idol my-idol-${idolInfo.type}`} onClick={onClick}>
		担当：{idolInfo.name}</button>
);

const MyIdolView: React.FC = () => {
	const { myIdol, dispatch } = useContext(ApplicationContext);

	return <MyIdolViewBase idolInfo={IDOL_LIST2[myIdol]}
		onClick={() => dispatch({type: 'ToKanaKeyBoard', message: '-1'})}/>;
};

export default MyIdolView;
