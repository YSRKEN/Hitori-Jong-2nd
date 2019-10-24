import React, { useContext } from 'react';
import { Hand } from 'constant/other';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';
import { ApplicationContext } from 'context';

// ユニット用のタイル
const UnitTile: React.FC<{ id: number }> = ({ id }) => {
  const chiStyle = UNIT_LIST2[id].chiFlg ? 'unit-tile-chi' : '';
  const widthstyle = `unit-tile-width-${UNIT_LIST2[id].count}`;

  return (
    <td className="tile">
      <button type="button" className={`unit-tile ${widthstyle} ${chiStyle}`}>
        {UNIT_LIST2[id].name}
      </button>
    </td>
  );
};

// アイドル用のタイル
const IdolTile: React.FC<{ id: number }> = ({ id }) => {
  const fontstyle = `idol-tile-${IDOL_LIST2[id].fontSize}`;
  const colorStyle = `idol-tile-${IDOL_LIST2[id].type}`;

  return (
    <td className="tile">
      <button type="button" className={`idol-tile ${fontstyle} ${colorStyle}`}>
        {IDOL_LIST2[id].name}
      </button>
    </td>
  );
};

// 手牌表示
const MyHandTileListBase: React.FC<{ myHand: Hand }> = ({ myHand }) => (
  <table className="l-margin-center tile-list">
    <tbody>
      <tr>
        {myHand.unit.map((id, index) => (
          <UnitTile key={index} id={id} />
        ))}
        {myHand.member.map((id, index) => {
          if (id >= 0) {
            return <IdolTile key={index} id={id} />;
          }

          return <td key={index} className="idol-tile-hidden" />;
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
