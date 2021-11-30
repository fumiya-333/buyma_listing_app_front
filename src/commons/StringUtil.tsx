/** エスケープ文字列 正規表現 */
const escapeRegex = /[-[\]{}()*+?.,\\^$|#\s]/g;

/**
 * エスケープを行う文字列を置換
 * 
 * @param s 文字列 
 * @returns 文字列
 */
export const escapeRegExp = (s: string): string => {
  return s.replace(escapeRegex, '\\$&');
}