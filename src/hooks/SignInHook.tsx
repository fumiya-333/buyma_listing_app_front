import { useContext, ChangeEvent, useState, useCallback } from 'react';
import { SnackbarOrigin } from '@mui/material';
import { useNavigate } from "react-router-dom";
import { httpGet } from '../commons/HttpUtil';
import { isEmailFormat } from '../commons/CheckedUtil';
import * as AppConstants from '../commons/AppConstants';
import { CookieUtil } from '../commons/CookieUtil';
import { getAddHoursNow } from '../commons/DateUtil';
import { WarningMessageContext } from '../providers/WarningMessageProvider';
import { ProgressDialogContext } from '../providers/ProgressDialogProvider';

/**
 * ログイン入力管理用フック
 * 
 * @param warningMessageRef 警告メッセージ参照オブジェクト
 * @param progressDialogRef プログレスダイアログ参照オブジェクト
 * @returns ログイン入力管理用フック
 */
export const SignInHook = () => {

  /** メールアドレス */
  const [email, setEmail] = useState('');
  /** パスワード */
  const [password, setPassword] = useState('');
  /** メールアドレス エラーフラグ */
  const [emailErrFlg, setEmailErrFlg] = useState(false);
  /** パスワード エラーフラグ */
  const [passwordErrFlg, setPasswordErrFlg] = useState(false);
  /** メールアドレス エラーメッセージ */
  const [emailErrMsg, setEmailErrMsg] = useState('');
  /** パスワード エラーメッセージ */
  const [passwordErrMsg, setPasswordErrMsg] = useState('');
  /** クッキー処理 */
  const { saveCookie } = CookieUtil();
  /** 画面遷移 */
  const navigate = useNavigate();

  /** 警告メッセージ 参照オブジェクト */
  const warningMessageRef = useContext(WarningMessageContext);
  /** プログレスダイアログ 参照オブジェクト */
  const progressDialogRef = useContext(ProgressDialogContext);

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
   * エラー設定
   * 
   * @param retFlgAry 入力チェック結果配列
   * @param setErrFlg エラーフラグ設定メソッド
   * @param setErrMsg エラーメッセージ設定メソッド
   * @param errFlg エラーフラグ
   * @param errMsg エラーメッセージ
   */
  const setError = useCallback((retFlgAry: boolean[], setErrFlg: { (param: boolean): void }, setErrMsg: { (param: string): void }, errFlg: boolean, errMsg: string) => {
    retFlgAry.push(errFlg);
    setErrFlg(errFlg);
    setErrMsg(errMsg);
  }, []);

  /**
   * 入力チェック
   * 
   * @returns 入力チェック結果配列
   */
  const checkedInput = useCallback(() => {

    const retFlgAry: boolean[] = [];
    const emailMsg = [''];

    const checkedEmailResult = checkedEmail(emailMsg, email);
    setError(retFlgAry, setEmailErrFlg, setEmailErrMsg, checkedEmailResult, emailMsg[0]);
    setError(retFlgAry, setPasswordErrFlg, setPasswordErrMsg, password === '', password ? '' : `${AppConstants.ATTR_PASSWORD}${AppConstants.ERR_MSG_PLEASE_INPUT}`);

    return retFlgAry;
  }, [email, password, setError, setEmailErrFlg, setPasswordErrFlg, setEmailErrMsg, setPasswordErrMsg]);

  /**
   * メールアドレス入力チェック
   * 
   * @param emailMsg メールアドレスエラーメッセージ
   * @param email メールアドレス
   * @returns メールアドレス入力チェック結果
   */
  const checkedEmail = (emailMsg: string[], email: string) => {
    if(!email){
      emailMsg[0] = `${AppConstants.ATTR_EMAIL}${AppConstants.ERR_MSG_PLEASE_INPUT}`;
      return true;
    }
    if(!isEmailFormat(email)){
      emailMsg[0] = `${AppConstants.ERR_MSG_FORMAT}${AppConstants.ATTR_EMAIL}${AppConstants.ERR_MSG_PLEASE_INPUT}`;
      return true;
    }

    emailMsg[0] = '';
    return false;
  }

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
    // 入力チェック
    if(checkedInput().includes(true)){
      warningMessageRef.current?.showMessage(AppConstants.ANCOR_ORIGIN_TOP_RIGHT as SnackbarOrigin, AppConstants.ERR_MSG_INPUT);
      return;
    }
    // ログイン処理実行
    execSignIn();
  }, [warningMessageRef, checkedInput, execSignIn]);

  return { email, password, emailErrFlg, passwordErrFlg, emailErrMsg, passwordErrMsg, changeEmail, changePassword, procSignIn };
}