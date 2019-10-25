import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { getTrashArea } from 'service/utility';
import { PRODUCER_COUNT, USER_NAME_LIST } from 'constant/other';
import IdolTile from 'parts/idolTile';

// 控え室画面
const TrashSceneBase: React.FC<{
  trashArea: number[][];
  backToGame: () => void;
}> = ({ trashArea, backToGame }) => {
  const domList = [];
  for (let i = 0; i < PRODUCER_COUNT; i += 1) {
    const userName = USER_NAME_LIST[i];
    const domList2 = trashArea[i].map((id, index) => (
      <IdolTile key={index} id={id} selectedFlg={false} onClick={() => {}} />
    ));
    domList.push(
      <>
        <span className="trash-title">{userName}の控え室：</span>
        <table className="tile-list l-margin-bottom">
          <tr>{domList2}</tr>
        </table>
      </>,
    );
  }

  return (
    <>
      <div className="l-header">
        <button
          type="button"
          className="l-margin-right default-button back-title"
          onClick={backToGame}
        >
          ゲーム画面に戻る
        </button>
      </div>
      <div className="l-main-trash">{domList}</div>
    </>
  );
};

const TrashScene: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  const trashArea = getTrashArea();

  return (
    <TrashSceneBase
      trashArea={trashArea}
      backToGame={() => dispatch({ type: 'BackToGame', message: '' })}
    />
  );
};

export default TrashScene;
