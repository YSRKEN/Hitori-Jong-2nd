import React, { useContext } from 'react';
import { ApplicationContext } from 'context';
import { UNIT_LIST2 } from 'constant2/unit';
import { IDOL_LIST2 } from 'constant2/idol';
import { ScoreResult } from 'constant/other';

const AgariInfo: React.FC<{
  idol: number,
  result: ScoreResult,
  myIdol: number
}> = ({ idol, result, myIdol }) => {
  return (<>
    <span className="agari-info l-margin-top">
      ・{IDOL_LIST2[idol].name}　{result.score}点
    </span>
    <table className="unit-list l-margin-bottom l-margin-top">
      <thead>
        <tr>
          <th>得点</th>
          <th>ユニット名</th>
          <th>残りメンバー</th>
        </tr>
      </thead>
      <tbody>
        {result.unit.map((unitId, index) => {
          const unitInfo = UNIT_LIST2[unitId];
          return (
            <tr key={index}>
              <td>{unitInfo.score}</td>
              <td>{unitInfo.name + (unitInfo.chiFlg ? '(チー)' : '')}</td>
              <td>{unitInfo.member.map(id => IDOL_LIST2[id].name).join('、')}</td>
            </tr>
          );
        })}
        {
          result.myIdolFlg
            ? <tr>
              <td>2000</td>
              <td>(担当ボーナス)</td>
              <td>{IDOL_LIST2[myIdol].name}</td>
            </tr>
            : <></>
        }
      </tbody>
    </table>
  </>);
}

const WantedIdolScene: React.FC = () => {
  const { myHandS, myIdol, wantedIdolData, dispatch } = useContext(ApplicationContext);

  const backToSimulation = () =>
    dispatch({ type: 'BackToSimulation', message: '' });

  const freeMemberSet = new Set(myHandS.member.filter(id => id >= 0));
  const chiMemberSet = new Set<number>();
  const chiList: { overFlg: string, idol: string, unitName: string, otherIdol: string }[] =
    wantedIdolData.chi.map(record => {
      const unitInfo = UNIT_LIST2[record.unit];
      const otherIdolList = unitInfo.member.filter(id => id !== record.idol);
      for (const idolId of otherIdolList) {
        chiMemberSet.add(idolId);
      }
      return {
        overFlg: freeMemberSet.has(record.idol) ? '○' : '',
        idol: IDOL_LIST2[record.idol].name,
        unitName: unitInfo.name,
        otherIdol: otherIdolList.map(id => IDOL_LIST2[id].name).join('、')
      };
    }
    );
  const nonChiMemberList = Array.from(freeMemberSet).filter(id => !chiMemberSet.has(id));

  return (<>
    <div className="l-header">
      <button
        type="button"
        className="l-margin-right default-button back-title"
        onClick={backToSimulation}
      >
        シミュレーション画面に戻る
      </button>
    </div>
    <div className="l-main-wanted-idol">
      <span className="ron-list">
        ツモ/ロンできる牌：
      </span>
      {
        wantedIdolData.agari.map((record, index) => <AgariInfo key={index} idol={record.idol} result={record.result} myIdol={myIdol}/>)
      }
      <span className="ron-list">
        チーできる牌：
      </span>
      <table className="unit-list l-margin-bottom l-margin-top">
        <thead>
          <tr>
            <th>既存？</th>
            <th>追加メンバー</th>
            <th>ユニット名</th>
            <th>残りメンバー</th>
          </tr>
        </thead>
        <tbody>
          {chiList.map((record, index) => (
            <tr key={index}>
              <td>{record.overFlg}</td>
              <td>{record.idol}</td>
              <td>{record.unitName}</td>
              <td>{record.otherIdol}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <span className="ron-list">
        チーに関係しない牌：
      </span>
      <div className="l-margin-top l-margin-bottom">
        <span><strong>{nonChiMemberList.map(id => IDOL_LIST2[id].name).join('、')}</strong></span>
      </div>
    </div>
  </>);
};

export default WantedIdolScene;
