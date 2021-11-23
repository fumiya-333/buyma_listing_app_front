import { RefObject, ChangeEvent, useState, useCallback } from 'react';
import { SnackbarOrigin } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { httpGet } from '../commons/HttpUtil';
import { isEmailFormat } from '../commons/CheckedUtil';
import * as AppConstants from '../commons/AppConstants';
import { CookieUtil } from '../commons/CookieUtil';
import { getAddHoursNow } from '../commons/DateUtil';
import { WarningMessageHandles } from '../components/WarningMessage';
import { ProgressDialogHandles } from '../components/ProgressDialog';

/**
 * ログイン入力管理用フック
 * 
 * @param warningMessageRef 警告メッセージ参照オブジェクト
 * @param progressDialogRef プログレスダイアログ参照オブジェクト
 * @returns ログイン入力管理用フック
 */
export const SignInHook = (warningMessageRef: RefObject<WarningMessageHandles>, progressDialogRef: RefObject<ProgressDialogHandles>) => {
  /** メールアドレス */
  const [email, setEmail] = useState('');
  /** パスワード */
  const [password, setPassword] = useState('');
  /** クッキー処理 */
  const { saveCookie } = CookieUtil();
  /** 画面遷移 */
  const navigate = useNavigate();

  /**
   * メールアドレス入力変更
   * 
   * @param e changeイベント
   */
  const changeEmail = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  }, [setEmail]);

  /**
   * パスワード入力変更
   * 
   * @param e changeイベント
   */
  const changePassword = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  }, [setPassword]);

  /**
   * 入力チェック
   * 
   * @param message メッセージ
   * @returns 入力チェック結果
   */
  const checkedInput = useCallback((message: string[]) => {
    if(!email){
      message[0] = `${AppConstants.ATTR_EMAIL}${AppConstants.ERR_MSG_INPUT}`;
      return false;
    }

    if(!isEmailFormat(email)){
      message[0] = `${AppConstants.ERR_MSG_FORMAT}${AppConstants.ATTR_EMAIL}${AppConstants.ERR_MSG_INPUT}`;
      return false;
    }

    if(!password){
      message[0] = `${AppConstants.ATTR_PASSWORD}${AppConstants.ERR_MSG_INPUT}`;
      return false;
    }

    return true;
  }, [email, password]);

  /**
   * ログイン処理実行
   * 
   */
  const execSignIn = useCallback(async () => {
    // プログレスダイアログ タイトル設定
    progressDialogRef.current?.setTitle(AppConstants.ROAD_MSG_SIGN_IN);
    // プログレスダイアログを開く
    progressDialogRef.current?.showProgressDialog();
    // ログイン処理API実行
    return await httpGet(AppConstants.HTTP_URL_SIGN_IN, { params: { email: email, password: password } })
    .then(({ data }) => {
      // クッキーの有効期限日付を取得
      const cookieExpirationDate = getAddHoursNow(AppConstants.COOKIE_DATE_OF_EXPIRY_ADD_TIME);
      // jwtトークンをクッキーに設定
      saveCookie(AppConstants.KEY_TOKEN, data.token, cookieExpirationDate);
      // 出品リスト画面へ遷移する
      navigate(AppConstants.END_POINT_LISTING);
    })
    .catch((e) => {
      if(e.response){
        warningMessageRef.current?.showMessage(AppConstants.ANCOR_ORIGIN_TOP_RIGHT as SnackbarOrigin, e.response.data.message);
      }else{
        warningMessageRef.current?.showMessage(AppConstants.ANCOR_ORIGIN_TOP_RIGHT as SnackbarOrigin, AppConstants.ERR_MSG_SIGN_IN);
      }
    })
    .finally(() => {
      // プログレスダイアログを閉じる
      progressDialogRef.current?.closeProgressDialog();
    });
}, [email, password, progressDialogRef, warningMessageRef, saveCookie, navigate]);

  /**
   * ログイン処理
   * 
   */
  const procSignIn = useCallback(() => {
    const message: string[] = [''];
    // 入力チェック
    if(!checkedInput(message)){
      warningMessageRef.current?.showMessage(AppConstants.ANCOR_ORIGIN_TOP_RIGHT as SnackbarOrigin, message[0]);
      return;
    }
    // ログイン処理実行
    execSignIn();
  }, [warningMessageRef, checkedInput, execSignIn]);

  return { email, password, changeEmail, changePassword, procSignIn };
}