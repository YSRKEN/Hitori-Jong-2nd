import { loadSetting, saveSetting } from 'service/setting';

// リセット情報を取得する
// (dispatchから例外を送出できないので苦肉の策)
export const getResetFlg = () => {
  return loadSetting('ResetFlg', false);
};

// リセット情報を書き込む
// (dispatchから例外を送出できないので苦肉の策)
export const setResetFlg = (resetFlg: boolean) => {
  saveSetting('ResetFlg', resetFlg);
};
