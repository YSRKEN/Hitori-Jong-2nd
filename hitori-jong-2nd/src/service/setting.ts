// 設定値を読み取る
export const loadSetting = <T>(
  key: string,
  defaultValue: T,
  toIntFlg = true,
): T => {
  // キーから値を読み取り、null値ならデフォルト値を返す
  const value = window.localStorage.getItem(key);
  if (value === null) {
    return defaultValue;
  }

  // そうでないなら、型に応じた判定を行う
  switch (typeof defaultValue) {
    case 'number':
      if (toIntFlg) {
        return (parseInt(value, 10) as any) as T;
      }

      return (parseFloat(value) as any) as T;
    case 'bigint':
      return (BigInt(value) as any) as T;
    case 'boolean':
      return ((value.toLowerCase() === 'true') as any) as T;
    case 'object':
      return JSON.parse(value) as T;
    case 'string':
      return (value as any) as T;
    default:
      throw Error('未対応の型です。');
  }
};

// 設定値を書き出す
export const saveSetting = <T>(key: string, value: T) => {
  switch (typeof value) {
    case 'bigint':
      window.localStorage.setItem(key, value.toString(10));
      break;
    case 'boolean':
      window.localStorage.setItem(key, value.toString());
      break;
    case 'number':
      window.localStorage.setItem(key, value.toString());
      break;
    case 'object':
      window.localStorage.setItem(key, JSON.stringify(value));
      break;
    case 'string':
      window.localStorage.setItem(key, value);
      break;
    default:
      throw Error('未対応の型です。');
  }
};
