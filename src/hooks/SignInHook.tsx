import { ChangeEvent, useState } from 'react';
import { httpGet } from '../commons/HttpUtil';
import { isKeyExists, isNull, isEmailFormat } from '../commons/CheckedUtil';
import * as AppConstants from '../commons/AppConstants';
import { CookieUtil } from '../commons/CookieUtil';
import { useNavigate } from "react-router-dom";
import { getAddHoursNow } from '../commons/DateUtil';

/**
 * ログイン入力管理用フック
 * 
 * @param warningMessageRef 警告メッセージ参照オブジェクト
 * @param progressDialogRef プログレスダイアログ参照オブジェクト
 * @returns ログイン入力管理用フック
 */
export function SignInHook(warningMessageRef: any, progressDialogRef: any){
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
  function changeEmail(e: ChangeEvent<HTMLInputElement>){
    setEmail(e.target.value);
  }

  /**
   * パスワード入力変更
   * 
   * @param e changeイベント
   */
  function changePassword(e: ChangeEvent<HTMLInputElement>){
    setPassword(e.target.value);
  }

  /**
   * ログイン処理
   * 
   */
  function procSignIn() {
    var message: string[] = [''];
    // 入力チェック
    if(!checkedInput(message)){
      warningMessageRef.current?.showMessage({ vertical: 'top', horizontal: 'right' }, message[0]);
      return;
    }
    // ログイン処理実行
    execSignIn();
  }

  /**
   * 入力チェック
   * 
   * @param message メッセージ
   * @returns 入力チェック結果
   */
  function checkedInput(message: string[]) {
    if(isNull(email)){
      message[0] = AppConstants.ATTR_EMAIL + AppConstants.ERR_MSG_INPUT;
      return false;
    }

    if(!isEmailFormat(email)){
      message[0] = AppConstants.ERR_MSG_FORMAT + AppConstants.ATTR_EMAIL + AppConstants.ERR_MSG_INPUT;
      return false;
    }

    if(isNull(password)){
      message[0] = AppConstants.ATTR_PASSWORD + AppConstants.ERR_MSG_INPUT;
      return false;
    }

    return true;
  }

  /**
   * ログイン処理実行
   * 
   */
  async function execSignIn(){
    // プログレスダイアログ タイトル設定
    progressDialogRef.current?.setTitle(AppConstants.ROAD_MSG_SIGN_IN);
    // プログレスダイアログを開く
    progressDialogRef.current?.showProgressDialog();
    // ログイン処理API実行
    const res = await httpGet(AppConstants.HTTP_URL_SIGN_IN, { params: { email: email, password: password } });
    // プログレスダイアログを閉じる
    progressDialogRef.current?.closeProgressDialog();
    if(res.successFlg === AppConstants.ON_FLG){
      if(!isKeyExists(res.data, AppConstants.KEY_MESSAGE)){
        // クッキーの有効期限日付を取得
        var date = getAddHoursNow(AppConstants.COOKIE_DATE_OF_EXPIRY_ADD_TIME);
        // jwtトークンをクッキーに設定
        saveCookie(AppConstants.KEY_TOKEN, res.data.token, date);
        // 出品リスト画面へ遷移する
        navigate(AppConstants.END_POINT_LISTING);
      }else{
        warningMessageRef.current?.showMessage({ vertical: 'top', horizontal: 'right' }, res.data.message);
      }
    }else{
      console.log(res.err);
      warningMessageRef.current?.showMessage({ vertical: 'top', horizontal: 'right' }, AppConstants.ERR_MSG_SIGN_IN);
    }
  }

  return { email, password, changeEmail, changePassword, procSignIn };
}