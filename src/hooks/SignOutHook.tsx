import * as AppConstants from '../commons/AppConstants';
import { CookieUtil } from '../commons/CookieUtil';
import { useNavigate } from "react-router-dom";

/**
 * ログアウト管理用フック
 * 
 * @returns ログアウト管理用フック
 */
export function SignOutHook(){
  /** クッキー処理 */
  const { deleteCookie } = CookieUtil();
    /** 画面遷移 */
    const navigate = useNavigate();

  /**
   * ログアウト処理
   * 
   */
  function procSignOut() {
    // クッキーの削除
    deleteCookie(AppConstants.KEY_TOKEN);
    // ログイン画面へ遷移する
    navigate(AppConstants.END_POINT_SIGN_IN);
  }

  return { procSignOut };
}