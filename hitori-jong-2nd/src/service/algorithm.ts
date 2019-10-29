// [0, n)の整数一様乱数を得る。参考：MDN
const getRandomInt = (n: number) => {
  return Math.floor(Math.random() * n);
};

// [0, n)の整数一様乱数を得る。参考・MDN、cpprefjp
const getRandomIntSecure = (n: number) => {
  const rawValueLimit = Math.floor(4294967296 / n) * n;
  // eslint-disable-next-line no-constant-condition
  while (true) {
    // [0, 2^32=4294967296)の整数乱数を得る
    const rawValue = window.crypto.getRandomValues(new Uint32Array(1))[0];

    // 整数乱数がある値以上ならば、その結果を棄却して再度乱数を出させる(モジュロ問題の回避)
    if (rawValue >= rawValueLimit) {
      continue;
    } else {
      return rawValue % n;
    }
  }
};

// 配列(と言うか牌山)をシャッフルする。注意事項として、
// 1. 実用面を考慮して、破壊的メソッドにしている
// 2. シャッフルアルゴリズムは法を使用している
// 3. 乱数生成には、上記のgetRandomInt()関数またはgetRandomIntSecure()関数を使用している
// 4. window.crypto.getRandomValues()が利用可能ならgetRandomIntSecure()、そうでないならgetRandomInt()を使用する
export const shuffleDeck = <T>(arr: T[]) => {
  const output = [...arr];
  if (typeof window.crypto.getRandomValues === 'function') {
    for (let i = output.length - 1; i >= 1; i -= 1) {
      const j = getRandomIntSecure(i + 1);
      const a = output[i];
      output[i] = output[j];
      output[j] = a;
    }
  } else {
    for (let i = output.length - 1; i >= 1; i -= 1) {
      const j = getRandomInt(i + 1);
      const a = output[i];
      output[i] = output[j];
      output[j] = a;
    }
  }

  return output;
};
