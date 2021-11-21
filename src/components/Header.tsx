import { AppBar, Toolbar, Typography, Box } from '@mui/material';
import { useLocation } from 'react-router';
import { SignOutHook } from '../hooks/SignOutHook';
import * as AppConstants from '../commons/AppConstants';

/**
 * ヘッダー用コンポーネント
 * 
 * @returns ヘッダー
 */
export const Header = () => {
  const location = useLocation();
  const { procSignOut } = SignOutHook();

  return (
    <AppBar position="absolute" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component="div">
              外注管理システム
            </Typography>
            <Box sx={{ flexGrow: 1 }} />
            { location.pathname !== AppConstants.END_POINT_SIGN_IN &&
              <Typography sx= {{ cursor: "pointer" }} color="inherit" onClick={procSignOut} component="div">
                ログアウト
              </Typography>
            }
        </Toolbar>
    </AppBar>
  );
}
