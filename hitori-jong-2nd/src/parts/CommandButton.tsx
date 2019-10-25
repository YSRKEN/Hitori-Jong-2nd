import React from 'react';

// コマンドボタン
const CommandButton: React.FC<{
  text: string;
  hiddenFlg: boolean;
  onClick?: () => void;
}> = ({ text, hiddenFlg, onClick = () => {} }) => {
  let css = 'l-margin-right default-button command';
  if (hiddenFlg) {
    css += ' is-display-none';
  }

  return (
    <button type="button" className={css} onClick={onClick}>
      {text}
    </button>
  );
};

export default CommandButton;
