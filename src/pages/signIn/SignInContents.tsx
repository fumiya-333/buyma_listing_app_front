import { useRef } from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Cpright } from '../../components/Cpright';
import { SignInHook } from '../../hooks/SignInHook';
import { WarningMessage, WarningMessageHandles } from '../../components/WarningMessage';
import { ProgressDialog, ProgressDialogHandles } from '../../components/ProgressDialog';

/** テーマの作成 */
const theme = createTheme();

/**
 * ログインコンテンツ用コンポーネント
 * 
 * @returns ログインコンテンツ
 */
export function SignInContents() {
  /** 警告メッセージ参照オブジェクト */
  const warningMessageRef = useRef<WarningMessageHandles>(null);
  /** プログレスダイアログ参照オブジェクト */
  const progressDialogRef = useRef<ProgressDialogHandles>(null);
  /** ログイン入力管理 */
  const { email, password, changeEmail, changePassword, procSignIn } = SignInHook(warningMessageRef, progressDialogRef);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            ログイン
          </Typography>
          <Box sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              value={email}
              fullWidth
              id="email"
              label="メールアドレス"
              name="email"
              autoComplete="email"
              onChange={changeEmail}
              autoFocus
            />
            <TextField
              margin="normal"
              value={password}
              fullWidth
              name="password"
              label="パスワード"
              type="password"
              id="password"
              onChange={changePassword}
              autoComplete="current-password"
            />
            <Button
              type="submit"
              fullWidth
              variant="contained"
              onClick={procSignIn}
              sx={{ mt: 3, mb: 2 }}
            >
              ログイン
            </Button>
          </Box>
        </Box>
        <Cpright sx={{ mt: 8, mb: 4 }} />
        <WarningMessage ref={warningMessageRef}/>
        <ProgressDialog ref={progressDialogRef}/>
      </Container>
    </ThemeProvider>
  );
}