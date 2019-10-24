import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { Hand } from 'constant/other';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';

// シミュレーション画面
const SimulationSceneBase: React.FC<{
  myHandS: Hand;
  backToTitle: () => void;
}> = ({ myHandS, backToTitle }) => (
  <>
    <div className="l-header">
      <button
        type="button"
        className="button-radius button-back-title"
        onClick={backToTitle}
      >
        タイトルに戻る
      </button>
    </div>
    <h1>シミュレーション画面</h1>
    <div className="l-footer">
      <table className="tile-list">
        <tbody>
          <tr>
            {myHandS.unit.map(id => {
              const chiStyle = UNIT_LIST2[id].chiFlg
                ? 'button-tile-unit-chi'
                : '';
              const widthstyle = `button-tile-width-${UNIT_LIST2[id].count}`;

              return (
                <td key={id} className="tile">
                  <button
                    type="button"
                    className={`button-tile-unit ${widthstyle} ${chiStyle}`}
                  >
                    {UNIT_LIST2[id].name}
                  </button>
                </td>
              );
            })}
            {myHandS.member.map(id => {
              const fontstyle = `button-tile-idol-${IDOL_LIST2[id].fontSize}`;
              const colorStyle = `button-tile-idol-${IDOL_LIST2[id].type}`;

              return (
                <td key={id} className="tile">
                  <button
                    type="button"
                    className={`button-tile-idol ${fontstyle} ${colorStyle}`}
                  >
                    {IDOL_LIST2[id].name}
                  </button>
                </td>
              );
            })}
          </tr>
        </tbody>
      </table>
    </div>
  </>
);

const SimulationScene: React.FC = () => {
  const { myHandS, dispatch } = useContext(ApplicationContext);

  return (
    <SimulationSceneBase
      myHandS={myHandS}
      backToTitle={() => dispatch({ type: 'BackToTitle', message: '' })}
    />
  );
};

export default SimulationScene;
