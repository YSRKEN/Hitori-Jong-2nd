import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import MyHandTileList from 'parts/MyHandTileList';
import CommandButton from 'parts/CommandButton';

// シミュレーション画面
const SimulationSceneBase: React.FC<{
  selectedUnitCount: number;
  selectedMemberCount: number;
  backToTitle: () => void;
  backToGame: () => void;
  swapTile: () => void;
  shiftLeft: () => void;
  shiftRight: () => void;
  injectUnit: () => void;
  ejectUnit: () => void;
}> = ({ selectedUnitCount, selectedMemberCount, backToTitle, backToGame, swapTile, shiftLeft, shiftRight, injectUnit, ejectUnit }) => (
  <>
    <div className="l-header">
      <button
        type="button"
        className="default-button back-title"
        onClick={backToTitle}
      >
        タイトルに戻る
      </button>
    </div>
    <div className="l-main-simulation">
      <CommandButton
        text="交換"
        showFlg={selectedUnitCount === 0 && selectedMemberCount === 2}
        onClick={swapTile}
      />
      <CommandButton
        text="左シフト"
        showFlg={selectedUnitCount === 0 && selectedMemberCount >= 1}
        onClick={shiftLeft}
      />
      <CommandButton
        text="右シフト"
        showFlg={selectedUnitCount === 0 && selectedMemberCount >= 1}
        onClick={shiftRight}
      />
      <CommandButton
        text="固定：ユニット"
        showFlg={selectedUnitCount === 0 && selectedMemberCount >= 1}
        onClick={injectUnit}
      />
      <CommandButton
        text="解除：ユニット"
        showFlg={selectedUnitCount > 0 && selectedMemberCount === 0}
        onClick={ejectUnit}
      />
      <CommandButton text="ユニット？" showFlg />
      <CommandButton text="受け入れ？" showFlg />
      <CommandButton text="何切る？" showFlg />
      <CommandButton text="ゲーム画面に遷移" showFlg onClick={backToGame}/>
    </div>
    <div className="l-footer">
      <MyHandTileList />
    </div>
  </>
);

const SimulationScene: React.FC = () => {
  const { selectedUnitFlg, selectedMemberFlg, dispatch } = useContext(
    ApplicationContext,
  );

  return (
    <SimulationSceneBase
      selectedUnitCount={selectedUnitFlg.filter(flg => flg).length}
      selectedMemberCount={selectedMemberFlg.filter(flg => flg).length}
      backToTitle={() => dispatch({ type: 'BackToTitle', message: '' })}
      backToGame={() => dispatch({ type: 'BackToGame', message: '' })}
      swapTile={() => dispatch({ type: 'swapTile', message: '' })}
      shiftLeft={() => dispatch({ type: 'shiftLeft', message: '' })}
      shiftRight={() => dispatch({ type: 'shiftRight', message: '' })}
      injectUnit={() => dispatch({ type: 'injectUnit', message: '' })}
      ejectUnit={() => dispatch({ type: 'ejectUnit', message: '' })}
    />
  );
};

export default SimulationScene;
