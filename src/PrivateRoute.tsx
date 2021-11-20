import { isNull } from './commons/CheckedUtil';
import { CookieUtil } from './commons/CookieUtil';
import { Navigate } from 'react-router-dom';
import * as AppConstants from './commons/AppConstants';

export function PrivateRoute({ children }: any) {
  const { getCookies } = CookieUtil();
  return !isNull(getCookies().token)  ? children : <Navigate to={ AppConstants.END_POINT_SIGN_IN } />;
}