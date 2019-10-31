import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import MyHandTileList from 'parts/MyHandTileList';
import CommandButton from 'parts/CommandButton';
import MyIdolView from 'parts/MyIdolView';

// シミュレーション画面
const SimulationSceneBase: React.FC<{
  selectedUnitCount: number;
  selectedMemberCount: number;
  backToTitle: () => void;
  backToGame: () => void;
  changeTile: () => void;
  swapTile: () => void;
  shiftLeft: () => void;
  shiftRight: () => void;
  injectUnit: () => void;
  injectUnitChi: () => void;
  ejectUnit: () => void;
  showUnitInfo: () => void;
  judgeUnit: () => void;
  judgeWantedIdol: () => void;
  suggestAction: () => void;
}> = ({
  selectedUnitCount,
  selectedMemberCount,
  backToTitle,
  backToGame,
  changeTile,
  swapTile,
  shiftLeft,
  shiftRight,
  injectUnit,
  injectUnitChi,
  ejectUnit,
  showUnitInfo,
  judgeUnit,
  judgeWantedIdol,
  suggestAction
}) => (
      <>
        <div className="l-header">
          <button
            type="button"
            className="l-margin-right default-button back-title"
            onClick={backToTitle}
          >
            タイトルに戻る
      </button>
          <MyIdolView />
        </div>
        <div className="l-main-simulation">
          <CommandButton
            text="変更"
            showFlg={selectedUnitCount === 0 && selectedMemberCount === 1}
            onClick={changeTile}
          />
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
            text="固定：チー"
            showFlg={selectedUnitCount === 0 && selectedMemberCount >= 1}
            onClick={injectUnitChi}
          />
          <CommandButton
            text="解除：ユニット"
            showFlg={selectedUnitCount > 0 && selectedMemberCount === 0}
            onClick={ejectUnit}
          />
          <CommandButton
            text="ユニット詳細"
            showFlg={selectedUnitCount > 0 && selectedMemberCount === 0}
            onClick={showUnitInfo}
          />
          <CommandButton text="ユニット？" showFlg onClick={judgeUnit} />
          <CommandButton text="受け入れ？" showFlg onClick={judgeWantedIdol} />
          <CommandButton text="何切る？" showFlg onClick={suggestAction} />
          <CommandButton text="ゲーム画面に遷移" showFlg onClick={backToGame} />
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

  const changeTile = () => {
    // どの牌が選択されているかを調べる
    const selectedTileIndex = selectedMemberFlg.indexOf(true);
    dispatch({ type: 'ToKanaKeyBoard', message: `${selectedTileIndex}` });
  };

  return (
    <SimulationSceneBase
      selectedUnitCount={selectedUnitFlg.filter(flg => flg).length}
      selectedMemberCount={selectedMemberFlg.filter(flg => flg).length}
      backToTitle={() => dispatch({ type: 'BackToTitle', message: '' })}
      backToGame={() => dispatch({ type: 'BackToGame', message: '' })}
      changeTile={changeTile}
      swapTile={() => dispatch({ type: 'swapTile', message: '' })}
      shiftLeft={() => dispatch({ type: 'shiftLeft', message: '' })}
      shiftRight={() => dispatch({ type: 'shiftRight', message: '' })}
      injectUnit={() => dispatch({ type: 'injectUnit', message: 'false' })}
      injectUnitChi={() => dispatch({ type: 'injectUnit', message: 'true' })}
      ejectUnit={() => dispatch({ type: 'ejectUnit', message: '' })}
      showUnitInfo={() => dispatch({ type: 'showUnitInfo', message: '' })}
      judgeUnit={() => dispatch({ type: 'judgeUnit', message: '' })}
      judgeWantedIdol={() => dispatch({ type: 'judgeWantedIdol', message: '' })}
      suggestAction={() => dispatch({ type: 'suggestAction', message: '' })}
    />
  );
};

export default SimulationScene;
