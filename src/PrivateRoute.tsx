import { VFC, ReactNode } from 'react';
import { CookieUtil } from './commons/CookieUtil';
import { Navigate } from 'react-router-dom';
import * as AppConstants from './commons/AppConstants';

type Props = {
  children: ReactNode
};

export const PrivateRoute: VFC<Props> = ({ children }) => {
  const { getCookies } = CookieUtil();
  const element = getCookies().token ? children : <Navigate to={ AppConstants.END_POINT_SIGN_IN } />;
  return (
    <>
      {element}
    </>
  )
}