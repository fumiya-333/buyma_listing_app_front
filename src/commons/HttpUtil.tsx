import axios from 'axios';

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
    return await axios.get(url, params);
  } catch(e: any) {
    if(e.response === undefined){
      console.log(e.message);
    }
    throw e;
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
    return await axios.post(url, params);
  } catch(e: any) {
    if(e.response === undefined){
      console.log(e.message);
    }
    throw e;
  }
}