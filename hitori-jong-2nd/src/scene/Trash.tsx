import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { getTrashArea, getResetFlg } from 'service/utility';
import { PRODUCER_COUNT, USER_NAME_LIST } from 'constant/other';
import IdolTile from 'parts/idolTile';

// 控え室画面
const TrashSceneBase: React.FC<{
  trashArea: number[][];
  backToGame: () => void;
  selectTrash: (is: number, pid: number) => void;
}> = ({ trashArea, backToGame, selectTrash }) => {
  const domList = [];
  for (let i = 0; i < PRODUCER_COUNT; i += 1) {
    const userName = USER_NAME_LIST[i];
    const domList2 = trashArea[i].map((id, index) => (
      <IdolTile key={index + i * 100} id={id} selectedFlg={false} onClick={() => selectTrash(id, i)} />
    ));
    domList.push(
      <div key={i}>
        <span className="trash-title">{userName}の控え室：</span>
        <table className="tile-list l-margin-bottom">
          <tbody>
            <tr>{domList2}</tr>
          </tbody>
        </table>
      </div>,
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
  const selectTrash = (id: number, pid: number) => {
    dispatch({ type: 'selectTrash', message: `${id},${pid}` });

    let resetFlg = false;
    // eslint-disable-next-line no-constant-condition
    while (true) {
      dispatch({ type: 'moveOtherProducer', message: '0' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      dispatch({ type: 'moveOtherProducer', message: '1' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      dispatch({ type: 'moveOtherProducer', message: '2' });
      if (getResetFlg()) {
        resetFlg = true;
        break;
      }
      break;
    }
    if (resetFlg) {
      window.alert('牌山から牌を引ききりました。盤面をリセットします。');
      dispatch({ type: 'resetGame', message: '' });
    }
  };

  return (
    <TrashSceneBase
      trashArea={trashArea}
      backToGame={() => dispatch({ type: 'BackToGame', message: '' })}
      selectTrash={selectTrash}
    />
  );
};

export default TrashScene;
