/**
 * 現在日付の取得
 * 
 * @returns 現在日付 
 */
export const getNow = () => {
  return new Date();
}

/**
 * 時間を加算
 * 
 * @param date 日付オブジェクト
 * @param addHours 加算時間
 * @returns 時間を加算した日付オブジェクト
 */
export const addHours = (date: Date, addHours: number) => {
  date.setHours(date.getHours() + addHours);
}

/**
 * 時間を加算して日付取得
 * 
 * @param hours 加算時間
 * @returns 時間を加算した日付オブジェクト
 */
export const getAddHoursNow = (hours: number) => {
  var date = getNow();
  addHours(date, hours);

  return date;
}