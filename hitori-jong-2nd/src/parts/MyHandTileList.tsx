import React, { useContext } from 'react';
import { Hand } from 'constant/other';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';
import { ApplicationContext } from 'context';
import { calcSelectedFlg } from 'service/hand';

// ユニット用のタイル
const UnitTile: React.FC<{ id: number, selectedFlg: boolean, onClick: () => void }> = ({ id, selectedFlg, onClick }) => {
  const chiStyle = UNIT_LIST2[id].chiFlg ? 'unit-tile-chi' : '';
  const widthstyle = `unit-tile-width-${UNIT_LIST2[id].count}`;
  const fontStyle = selectedFlg ? 'is-selected' : '';

  return (
    <td className="tile">
      <button type="button" className={`unit-tile ${widthstyle} ${chiStyle} ${fontStyle}`} onClick={onClick}>
        {UNIT_LIST2[id].name}
      </button>
    </td>
  );
};

// アイドル用のタイル
const IdolTile: React.FC<{ id: number, selectedFlg: boolean, onClick: () => void }> = ({ id, selectedFlg, onClick }) => {
  const fontstyle = `idol-tile-${IDOL_LIST2[id].fontSize}`;
  const colorStyle = `idol-tile-${IDOL_LIST2[id].type}`;
  const fontStyle = selectedFlg ? 'is-selected' : '';

  return (
    <td className="tile">
      <button type="button" className={`idol-tile ${fontstyle} ${colorStyle} ${fontStyle}`} onClick={onClick}>
        {IDOL_LIST2[id].name}
      </button>
    </td>
  );
};

// 手牌表示
const MyHandTileListBase: React.FC<{
  myHand: Hand,
  selectedTileFlg: boolean[],
  selectUnit: (index: number) => void,
  selectMember: (index: number) => void
}> = ({ myHand, selectedTileFlg, selectUnit, selectMember }) => {
  // ユニットとそれ以外について、選択状態かどうかを計算する
  const {selectedUnitFlg, selectedMemberFlg} = calcSelectedFlg(myHand, selectedTileFlg);

  return (
    <table className="l-margin-center tile-list">
      <tbody>
        <tr>
          {myHand.unit.map((id, index) => (
            <UnitTile key={index} id={id} selectedFlg={selectedUnitFlg[index]}
              onClick={() => selectUnit(index)}/>
          ))}
          {myHand.member.map((id, index) => {
            if (id >= 0) {
              return <IdolTile key={index} id={id} selectedFlg={selectedMemberFlg[index]}
                onClick={() => selectMember(index)}/>;
            } else {
              return <td key={index} className="idol-tile-hidden" />;
            }
          })}
        </tr>
      </tbody>
    </table>
  );
}

const MyHandTileList: React.FC = () => {
  const { applicationMode, myHandG, myHandS, selectedTileFlg, dispatch } = useContext(ApplicationContext);

  // 牌を選択する
  const selectUnit = (index: number) => dispatch({type: 'selectUnit', message: `${index}`});
  const selectMember = (index: number) => dispatch({type: 'selectMember', message: `${index}`});

  switch (applicationMode) {
    case 'Game':
      return <MyHandTileListBase myHand={myHandG} selectedTileFlg={selectedTileFlg} selectUnit={selectUnit}
        selectMember={selectMember }/>;
    case 'Simulation':
      return <MyHandTileListBase myHand={myHandS} selectedTileFlg={selectedTileFlg} selectUnit={selectUnit}
        selectMember={selectMember} />;
    default:
      return <></>;
  }
};

export default MyHandTileList;
