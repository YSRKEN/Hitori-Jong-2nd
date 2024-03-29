import React, { useContext } from 'react';
import { Hand } from 'constant/other';
import { UNIT_LIST2 } from 'constant2/unit';
import { ApplicationContext } from 'context';
import IdolTile from 'parts/idolTile';

// ユニット用のタイル
const UnitTile: React.FC<{
  id: number;
  selectedFlg: boolean;
  onClick: () => void;
}> = ({ id, selectedFlg, onClick }) => {
  const chiStyle = UNIT_LIST2[id].chiFlg ? 'unit-tile-chi' : '';
  const widthstyle = `unit-tile-width-${UNIT_LIST2[id].count}`;
  const fontStyle = selectedFlg ? 'is-selected' : '';

  return (
    <td className="tile">
      <button
        type="button"
        className={`unit-tile ${widthstyle} ${chiStyle} ${fontStyle}`}
        onClick={onClick}
      >
        {UNIT_LIST2[id].name}
      </button>
    </td>
  );
};

// 手牌表示
const MyHandTileListBase: React.FC<{
  myHand: Hand;
  selectedUnitFlg: boolean[];
  selectedMemberFlg: boolean[];
  selectUnit: (index: number) => void;
  selectMember: (index: number) => void;
}> = ({
  myHand,
  selectedUnitFlg,
  selectedMemberFlg,
  selectUnit,
  selectMember,
}) => {
  return (
    <table className="l-margin-center tile-list">
      <tbody>
        <tr>
          {myHand.unit.map((id, index) => (
            <UnitTile
              key={index}
              id={id}
              selectedFlg={selectedUnitFlg[index]}
              onClick={() => selectUnit(index)}
            />
          ))}
          {myHand.member.map((id, index) => {
            if (id >= 0) {
              return (
                <IdolTile
                  key={index}
                  id={id}
                  selectedFlg={selectedMemberFlg[index]}
                  onClick={() => selectMember(index)}
                />
              );
            }

            return <td key={index} className="idol-tile-hidden" />;
          })}
        </tr>
      </tbody>
    </table>
  );
};

const MyHandTileList: React.FC = () => {
  const {
    applicationMode,
    myHandG,
    myHandS,
    selectedUnitFlg,
    selectedMemberFlg,
    dispatch,
  } = useContext(ApplicationContext);

  // 牌を選択する
  const selectUnit = (index: number) =>
    dispatch({ type: 'selectUnit', message: `${index}` });
  const selectMember = (index: number) =>
    dispatch({ type: 'selectMember', message: `${index}` });

  switch (applicationMode) {
    case 'Game':
      return (
        <MyHandTileListBase
          myHand={myHandG}
          selectedUnitFlg={selectedUnitFlg}
          selectedMemberFlg={selectedMemberFlg}
          selectUnit={selectUnit}
          selectMember={selectMember}
        />
      );
    case 'Simulation':
      return (
        <MyHandTileListBase
          myHand={myHandS}
          selectedUnitFlg={selectedUnitFlg}
          selectedMemberFlg={selectedMemberFlg}
          selectUnit={selectUnit}
          selectMember={selectMember}
        />
      );
    default:
      return <></>;
  }
};

export default MyHandTileList;
