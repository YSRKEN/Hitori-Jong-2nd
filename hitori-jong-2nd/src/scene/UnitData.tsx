import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { UNIT_LIST2 } from 'constant2/unit';

const UnitDataSceneBase: React.FC<{
  unitData: { unit0: number[]; unit1: number[]; unit2: number[] };
  backToSimulation: () => void;
}> = ({ unitData, backToSimulation }) => (
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
    <div>
      <h3>完成したユニット：</h3>
      <p>{`${unitData.unit0.map(id => UNIT_LIST2[id].name)}`}</p>
      <h3>あと1枚で完成するユニット：</h3>
      <p>{`${unitData.unit1.map(id => UNIT_LIST2[id].name)}`}</p>
      <h3>あと2枚で完成するユニット：</h3>
      <p>{`${unitData.unit1.map(id => UNIT_LIST2[id].name)}`}</p>
    </div>
  </>
);

const UnitDataScene: React.FC = () => {
  const { unitData, dispatch } = useContext(ApplicationContext);

  return (
    <UnitDataSceneBase
      unitData={unitData}
      backToSimulation={() =>
        dispatch({ type: 'BackToSimulation', message: '' })
      }
    />
  );
};

export default UnitDataScene;
