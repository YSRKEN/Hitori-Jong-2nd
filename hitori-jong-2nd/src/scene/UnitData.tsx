import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';

// 完成したユニットの情報
const UnitView0: React.FC<{
  unitList: number[];
}> = ({ unitList }) => (
  <table className="unit-list l-margin-bottom l-margin-top">
    <thead>
      <tr>
        <th>ユニット名</th>
        <th>ユニットメンバー</th>
      </tr>
    </thead>
    <tbody>
      {unitList.map((unitId, index) => {
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
}> = ({ freeMember, unitList }) => {
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
        {unitList.map((unitId, index) => {
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
  backToSimulation: () => void;
}> = ({ freeMember, unitData, backToSimulation }) => (
  <>
    <div className="l-header">
      <button
        type="button"
        className="l-margin-right default-button back-title"
        onClick={backToSimulation}
      >
        シミュレーション画面に戻る
      </button>
    </div>
    <div className="l-main-unitdata">
      <span className="unit-title">完成したユニット：</span>
      <UnitView0 unitList={unitData.unit0} />
      <span className="unit-title">あと1枚で完成するユニット：</span>
      <UnitViewX freeMember={freeMember} unitList={unitData.unit1} />
      <span className="unit-title">あと2枚で完成するユニット：</span>
      <UnitViewX freeMember={freeMember} unitList={unitData.unit2} />
    </div>
  </>
);

const UnitDataScene: React.FC = () => {
  const { myHandS, unitData, dispatch } = useContext(ApplicationContext);

  return (
    <UnitDataSceneBase
      freeMember={myHandS.member.filter(id => id >= 0)}
      unitData={unitData}
      backToSimulation={() =>
        dispatch({ type: 'BackToSimulation', message: '' })
      }
    />
  );
};

export default UnitDataScene;
