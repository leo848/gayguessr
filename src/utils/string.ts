export function levensthein(a: string, b: string): number {
  if (a.length === 0) return b.length;
  if (b.length === 0) return a.length;

  if (a.length > b.length) {
    [a, b] = [b, a];
  }

  let i = 0;
  let j = 0;
  let res = 0;

  const row = Array(a.length + 1);
  for (i = 0; i <= a.length; i++) {
    row[i] = i;
  }

  let tmp: any;

  for (i = 1; i <= b.length; i++) {
    res = i;
    for (j = 1; j <= a.length; j++) {
      tmp = row[j - 1];
      row[j - 1] = res;
      res = b.charAt(i - 1) === a.charAt(j - 1) ? tmp : Math.min(tmp + 1, Math.min(res + 1, row[j] + 1));
    }
  }
  return res;
}
