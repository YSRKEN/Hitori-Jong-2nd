import React, { useContext } from 'react';
import {
  APPLICATION_NAME,
  AUTHOR_URL,
  PROJECT_URL,
  README_URL,
  APPLICATION_VERSION,
} from 'constant/other';
import { ApplicationContext } from 'context';
import { TwitterShareButton } from 'react-share';

// タイトル画面
const TitleSceneBase: React.FC<{
  titleToGame: () => void;
  titleToSimulation: () => void;
}> = ({ titleToGame, titleToSimulation }) => (
  <>
    <div className="l-header l-flex">
      <a className="l-margin-right link" href={AUTHOR_URL}>
        作者Twitter
      </a>
      <a className="l-margin-right link" href={PROJECT_URL}>
        GitHubリンク
      </a>
      <a className="link" href={README_URL}>
        取扱説明書
      </a>
    </div>
    <div className="l-main-title">
      <div className="l-text-center">
        <span className="application-title">{APPLICATION_NAME}</span>
      </div>
      <div className="l-text-center">
        <span className="application-version">{APPLICATION_VERSION}</span>
      </div>
    </div>
    <div className="l-footer l-text-center">
      <button
        type="button"
        className="l-margin-right default-button top-menu top-menu-game"
        onClick={titleToGame}
      >
        ゲーム開始
      </button>
      <button
        type="button"
        className="l-margin-right default-button top-menu top-menu-simulation"
        onClick={titleToSimulation}
      >
        シミュレーション
      </button>
      <span className="default-button top-menu top-menu-share">
      <TwitterShareButton url="https://hitori-jong.firebaseapp.com" title="一人用ミリジャン練習アプリ「ヒトリジャン rev.2」" hashtags={['ミリジャン', 'ヒトリジャン']}>
          Twitterにシェア
      </TwitterShareButton>
      </span>
    </div>
  </>
);

const TitleScene: React.FC = () => {
  const { dispatch } = useContext(ApplicationContext);

  return (
    <TitleSceneBase
      titleToGame={() => dispatch({ type: 'TitleToGame', message: '' })}
      titleToSimulation={() =>
        dispatch({ type: 'TitleToSimulation', message: '' })
      }
    />
  );
};

export default TitleScene;
