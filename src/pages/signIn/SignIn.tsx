import { useContext, VFC } from 'react';
import { Avatar, Button, TextField, Box, Typography, Container, Toolbar } from '@mui/material';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { SignInTemplate } from '../../templates/SignInTemplate';
import { Cpright } from '../../components/Cpright';
import { SignInHook } from '../../hooks/SignInHook';
import { WarningMessageContext } from '../../providers/WarningMessageProvider';
import { ProgressDialogContext } from '../../providers/ProgressDialogProvider';
import { WarningMessage } from '../../components/WarningMessage';
import { ProgressDialog } from '../../components/ProgressDialog';

type Props = {};

/**
 * ログイン画面用コンポーネント
 * 
 * @returns ログイン画面
 */
export const SignIn: VFC<Props> = () => {

  /** 警告メッセージ 参照オブジェクト */
  const warningMessageRef = useContext(WarningMessageContext);
  /** プログレスダイアログ 参照オブジェクト */
  const progressDialogRef = useContext(ProgressDialogContext);

  /** ログイン入力管理 */
  const { email, password, emailErrFlg, passwordErrFlg, emailErrMsg, passwordErrMsg, changeEmail, changePassword, procSignIn } = SignInHook();

  return (
    <SignInTemplate>
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
              error={emailErrFlg}
              helperText={emailErrMsg}
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
              error={passwordErrFlg}
              helperText={passwordErrMsg}
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
    </SignInTemplate>
  );
}
