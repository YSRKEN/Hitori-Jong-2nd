import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';

// 完成したユニットの情報
const UnitView0: React.FC<{
  unitList: number[];
  unitDataFilterFlg: boolean;
}> = ({ unitList, unitDataFilterFlg }) => (
  <table className="unit-list l-margin-bottom l-margin-top">
    <thead>
      <tr>
        <th>ユニット名</th>
        <th>ユニットメンバー</th>
      </tr>
    </thead>
    <tbody>
      {unitList
        .filter(id => UNIT_LIST2[id].member.length >= 3 || !unitDataFilterFlg)
        .map((unitId, index) => {
          const unitInfo = UNIT_LIST2[unitId];
          const unitMember = unitInfo.member
            .map(id => IDOL_LIST2[id].name)
            .join('、');

          return (
            <tr key={index}>
              <td>{unitInfo.name}</td>
              <td>{unitMember}</td>
            </tr>
          );
        })}
    </tbody>
  </table>
);

// あとX枚で完成したユニットの情報
const UnitViewX: React.FC<{
  freeMember: number[];
  unitList: number[];
  unitDataFilterFlg: boolean;
}> = ({ freeMember, unitList, unitDataFilterFlg }) => {
  const freeMemberSet = new Set(freeMember);

  return (
    <table className="unit-list l-margin-bottom l-margin-top">
      <thead>
        <tr>
          <th>追加メンバー</th>
          <th>ユニット名</th>
          <th>残りメンバー</th>
        </tr>
      </thead>
      <tbody>
        {unitList
          .filter(id => UNIT_LIST2[id].member.length >= 3 || !unitDataFilterFlg)
          .map((unitId, index) => {
            const unitInfo = UNIT_LIST2[unitId];
            const unitMember1 = unitInfo.member
              .filter(id => !freeMemberSet.has(id))
              .map(id => IDOL_LIST2[id].name)
              .join('、');
            const unitMember2 = unitInfo.member
              .filter(id => freeMemberSet.has(id))
              .map(id => IDOL_LIST2[id].name)
              .join('、');

            return (
              <tr key={index}>
                <td>{unitMember1}</td>
                <td>{unitInfo.name}</td>
                <td>{unitMember2}</td>
              </tr>
            );
          })}
      </tbody>
    </table>
  );
};

// ユニット分析結果
const UnitDataSceneBase: React.FC<{
  freeMember: number[];
  unitData: { unit0: number[]; unit1: number[]; unit2: number[] };
  unitDataFilterFlg: boolean;
  backToSimulation: () => void;
  changeUnitDataFilterFlg: () => void;
}> = ({
  freeMember,
  unitData,
  unitDataFilterFlg,
  backToSimulation,
  changeUnitDataFilterFlg,
}) => (
  <>
    <div className="l-header">
      <button
        type="button"
        className="l-margin-right default-button back-title"
        onClick={backToSimulation}
      >
        シミュレーション画面に戻る
      </button>
      <input
        id="unitDataFilterFlg"
        type="checkbox"
        checked={unitDataFilterFlg}
        onChange={changeUnitDataFilterFlg}
      />
      <label htmlFor="unitDataFilterFlg">3人以上のユニットに絞る</label>
    </div>
    <div className="l-main-unitdata">
      <span className="unit-title">
        完成したユニット({unitData.unit0.length}組)：
      </span>
      <UnitView0
        unitList={unitData.unit0}
        unitDataFilterFlg={unitDataFilterFlg}
      />
      <span className="unit-title">
        あと1枚で完成するユニット({unitData.unit1.length}組)：
      </span>
      <UnitViewX
        freeMember={freeMember}
        unitList={unitData.unit1}
        unitDataFilterFlg={unitDataFilterFlg}
      />
      <span className="unit-title">
        あと2枚で完成するユニット({unitData.unit2.length}組)：
      </span>
      <UnitViewX
        freeMember={freeMember}
        unitList={unitData.unit2}
        unitDataFilterFlg={unitDataFilterFlg}
      />
    </div>
  </>
);

const UnitDataScene: React.FC = () => {
  const { myHandS, unitData, unitDataFilterFlg, dispatch } = useContext(
    ApplicationContext,
  );

  const changeUnitDataFilterFlg = () =>
    dispatch({ type: 'changeUnitDataFilterFlg', message: '' });

  return (
    <UnitDataSceneBase
      freeMember={myHandS.member.filter(id => id >= 0)}
      unitData={unitData}
      unitDataFilterFlg={unitDataFilterFlg}
      backToSimulation={() =>
        dispatch({ type: 'BackToSimulation', message: '' })
      }
      changeUnitDataFilterFlg={changeUnitDataFilterFlg}
    />
  );
};

export default UnitDataScene;
