/** メールアドレス 正規表現 */
const emailRegex = /^[A-Za-z0-9]{1}[A-Za-z0-9_.-]*@{1}[A-Za-z0-9_.-]{1,}\.[A-Za-z0-9]{1,}$/;

/**
 * オブジェクトキー存在チェック
 * @param obj オブジェクト
 * @param key キー
 * @returns オブジェクトキー存在チェック結果
 */
export const isKeyExists = (obj: object, key: string) => {
    return Object.keys(obj).indexOf(key) !== -1
}

/**
 * 文字列存在チェック
 * 
 * @param s 文字列
 * @returns 文字列存在チェック結果
 */
export const isNull = (s: string) => {
  return s === '' || s === undefined || s === null
}

/**
 * メールアドレスフォーマットチェック
 * 
 * @param email メールアドレス
 * @returns メールアドレスフォーマットチェック結果
 */
export const isEmailFormat = (email: string) => {
  return emailRegex.test(email);
}