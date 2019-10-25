import React from 'react';
import { IDOL_LIST2 } from 'constant2/idol';

// アイドル用のタイル
const IdolTile: React.FC<{
  id: number;
  selectedFlg: boolean;
  onClick: () => void;
}> = ({ id, selectedFlg, onClick }) => {
  const fontstyle = `idol-tile-${IDOL_LIST2[id].fontSize}`;
  const colorStyle = `idol-tile-${IDOL_LIST2[id].type}`;
  const fontStyle = selectedFlg ? 'is-selected' : '';

  return (
    <td className="tile">
      <button
        type="button"
        className={`idol-tile ${fontstyle} ${colorStyle} ${fontStyle}`}
        onClick={onClick}
      >
        {IDOL_LIST2[id].name}
      </button>
    </td>
  );
};

export default IdolTile;
