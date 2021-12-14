import * as AppConstants from '../commons/AppConstants';
import { CookieUtil } from '../commons/CookieUtil';
import { useNavigate } from "react-router-dom";
import { useCallback } from 'react';

/**
 * ログアウト管理用フック
 * 
 * @returns ログアウト管理用フック
 */
export const SignOutHook = () => {

  /** クッキー処理 */
  const { deleteCookie } = CookieUtil();
  /** 画面遷移 */
  const navigate = useNavigate();

  /**
   * ログアウト処理
   * 
   */
  const procSignOut = useCallback(() => {
    // クッキーの削除
    deleteCookie(AppConstants.KEY_TOKEN);
    // ログイン画面へ遷移する
    navigate(AppConstants.END_POINT_SIGN_IN);
  }, [deleteCookie, navigate]);

  return { procSignOut };
}