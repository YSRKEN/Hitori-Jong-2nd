import React, { useContext } from 'react';
import { Hand } from 'constant/other';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';
import { ApplicationContext } from 'context';

// 手牌表示
const MyHandTileListBase: React.FC<{ myHand: Hand }> = ({ myHand }) => (
  <table className="l-margin-center tile-list">
    <tbody>
      <tr>
        {myHand.unit.map(id => {
          const chiStyle = UNIT_LIST2[id].chiFlg ? 'unit-tile-chi' : '';
          const widthstyle = `unit-tile-width-${UNIT_LIST2[id].count}`;

          return (
            <td key={id} className="tile">
              <button
                type="button"
                className={`unit-tile ${widthstyle} ${chiStyle}`}
              >
                {UNIT_LIST2[id].name}
              </button>
            </td>
          );
        })}
        {myHand.member.map(id => {
          const fontstyle = `idol-tile-${IDOL_LIST2[id].fontSize}`;
          const colorStyle = `idol-tile-${IDOL_LIST2[id].type}`;

          return (
            <td key={id} className="tile">
              <button
                type="button"
                className={`idol-tile ${fontstyle} ${colorStyle}`}
              >
                {IDOL_LIST2[id].name}
              </button>
            </td>
          );
        })}
      </tr>
    </tbody>
  </table>
);

const MyHandTileList: React.FC = () => {
  const { applicationMode, myHandG, myHandS } = useContext(ApplicationContext);

  switch (applicationMode) {
    case 'Game':
      return <MyHandTileListBase myHand={myHandG} />;
    case 'Simulation':
      return <MyHandTileListBase myHand={myHandS} />;
    default:
      return <></>;
  }
};

export default MyHandTileList;
