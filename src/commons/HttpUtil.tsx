import axios from 'axios';
import * as AppConstants from './AppConstants';

/** axiosのBaseURL設定 */
axios.defaults.baseURL = process.env.REACT_APP_BASE_URL;

/**
 * http通信（get）
 * 
 * @param url URL
 * @param params パラメータ
 * @returns 処理結果（成功/失敗）
 */
export async function httpGet(url: string, params: object) {
  try {
    const res = await axios.get(url, params);
    return { config: res.config, data: res.data, headers: res.headers, request: res.request, status: res.status, statusText: res.statusText, error: null, successFlg: AppConstants.ON_FLG }
  } catch(err) {
    return { err: err, successFlg: AppConstants.OFF_FLG };
  }
}

/**
 * http通信（post）
 * 
 * @param url URL
 * @param params パラメータ
 * @returns 処理結果（成功/失敗）
 */
export async function httpPost(url: string, params: object) {
  try {
    const res = await axios.post(url, params);
    return { config: res.config, data: res.data, headers: res.headers, request: res.request, status: res.status, statusText: res.statusText, error: null, successFlg: AppConstants.ON_FLG }
  } catch(err) {
    return { err: err, successFlg: AppConstants.OFF_FLG };
  }
}