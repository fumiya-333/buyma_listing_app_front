import { VFC, useRef } from 'react';
import { Avatar, Button, TextField, Box, Typography, Container, Toolbar, createTheme, ThemeProvider } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Cpright } from '../../components/Cpright';
import { SignInHook } from '../../hooks/SignInHook';
import { WarningMessage, WarningMessageHandles } from '../../components/WarningMessage';
import { ProgressDialog, ProgressDialogHandles } from '../../components/ProgressDialog';

type Props = {};

/** テーマの作成 */
const theme = createTheme();

/**
 * ログインコンテンツ用コンポーネント
 * 
 * @returns ログインコンテンツ
 */
export const SignInContents: VFC<Props> = () => {
  /** 警告メッセージ参照オブジェクト */
  const warningMessageRef = useRef<WarningMessageHandles>(null);
  /** プログレスダイアログ参照オブジェクト */
  const progressDialogRef = useRef<ProgressDialogHandles>(null);
  /** ログイン入力管理 */
  const { email, password, changeEmail, changePassword, procSignIn } = SignInHook(warningMessageRef, progressDialogRef);

  return (
    <ThemeProvider theme={theme}>
      <Container component="main" maxWidth="xs">
        <Box
          sx={{
            marginTop: 5,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Toolbar/>
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