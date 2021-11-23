import React, { VFC, forwardRef, useImperativeHandle } from 'react';
import { Snackbar, SnackbarOrigin, Stack, AlertProps } from '@mui/material';
import MuiAlert from '@mui/material/Alert';

type Props = {
  ref: any
};

const Alert = React.forwardRef<HTMLDivElement, AlertProps>(function Alert(
  props,
  ref,
) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export interface State extends SnackbarOrigin {
  open: boolean;
}

export interface WarningMessageHandles {
  showMessage(newState: SnackbarOrigin, message: string): void;
}

/**
 * 警告メッセージ用コンポーネント
 * 
 * @param props プロパティ
 * @param ref コンポーネント参照オブジェクト
 * @returns 警告メッセージ
 */
export const WarningMessage: VFC<Props> = forwardRef<WarningMessageHandles>((props, ref) => {
  /** メッセージ */
  const [message, setMessage] = React.useState('');

  /** メッセージ表示、表示位置状態管理 */
  const [state, setState] = React.useState<State>({
    open: false,
    vertical: 'top',
    horizontal: 'right'
  });

  /** メッセージ表示、表示位置設定 */
  const { vertical, horizontal, open } = state;

  useImperativeHandle(ref, () => ({
    /**
     * 警告メッセージ表示
     * 
     * @param newState メッセージ表示、表示位置状態管理
     * @param message メッセージ
     */
    showMessage(newState: SnackbarOrigin, message: string) {
      setState({ open: true, ...newState });
      setMessage(message);
    }
  }));

  /**
   * 警告メッセージを閉じる
   * 
   */
  const closeMessage = () => {
    setState({ ...state, open: false });
  }

  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <Snackbar anchorOrigin={{ vertical, horizontal }} open={open} autoHideDuration={6000} onClose={closeMessage}>
        <Alert onClose={closeMessage} severity="warning" sx={{ width: '100%' }}>{message}</Alert>
      </Snackbar>
    </Stack>
  );
});