import React from 'react';
import {
  APPLICATION_NAME,
  AUTHOR_URL,
  PROJECT_URL,
  README_URL,
  APPLICATION_VERSION,
} from 'constant/other';

// タイトル画面
const TitleScene: React.FC = () => (
  <>
    <div className="l-header l-flex">
      <a className="l-mergin-right link" href={AUTHOR_URL}>
        作者Twitter
      </a>
      <a className="l-mergin-right link" href={PROJECT_URL}>
        GitHubリンク
      </a>
      <a className="link" href={README_URL}>
        取扱説明書
      </a>
    </div>
    <div className="l-main">
      <span className="application-title">{APPLICATION_NAME}</span>
      <span className="application-version">{APPLICATION_VERSION}</span>
    </div>
    <div className="l-footer l-flex">
      <button type="button" className="l-mergin-right button-top button-game">
        ゲーム開始
      </button>
      <button
        type="button"
        className="l-mergin-right button-top button-simulation"
      >
        シミュレーション
      </button>
      <button type="button" className="l-mergin-right button-top button-share">
        Twitterにシェア
      </button>
    </div>
  </>
);

export default TitleScene;
