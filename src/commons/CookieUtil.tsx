import { useCookies } from "react-cookie";

/**
 * cookie処理用コンポーネント
 * 
 * @returns cookie管理フック
 */
export function CookieUtil(){
  /** cookie管理フック */
  const [cookies, setCookie, removeCookie] = useCookies();

  /**
   * cookieの保存
   * 
   * @param key cookieのキー
   * @param value cookieの値
   * @param date cookie有効期限日付
   */
  function saveCookie(key: string, value: any, date: Date | null){
    date === null ? setCookie(key, value) : setCookie(key, value, { expires: date });
  }

  /**
   * cookieの取得
   * 
   * @returns cookie
   */
  function getCookies(){
    return cookies;
  }

  /**
   * 指定したキーのcookieの削除
   * 
   * @param key cookieのキー
   */
  function deleteCookie(key: string){
    removeCookie(key);
  }

  return { saveCookie, getCookies, deleteCookie };
}