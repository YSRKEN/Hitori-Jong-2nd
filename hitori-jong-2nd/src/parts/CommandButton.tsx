import React from 'react';

// コマンドボタン
const CommandButton: React.FC<{
  text: string;
  showFlg: boolean;
  onClick?: () => void;
}> = ({ text, showFlg, onClick = () => {} }) => {
  let css = 'l-margin-right default-button command';
  if (!showFlg) {
    css += ' is-display-none';
  }

  return (
    <button type="button" className={css} onClick={onClick}>
      {text}
    </button>
  );
};

export default CommandButton;
