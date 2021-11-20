import React, { forwardRef, useImperativeHandle } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import LinearProgress from '@mui/material/LinearProgress';
import { makeStyles } from '@mui/styles';

const useStyles = makeStyles({
  topScrollPaper: {
    alignItems: 'flex-start',
  }
})

export interface ProgressDialogHandles {
  setTitle(title: string): void,
  showProgressDialog(): void,
  closeProgressDialog(): void;
}

/**
 * プログレスダイアログ用コンポーネント
 * 
 * @param props プロパティ
 * @param ref コンポーネント参照オブジェクト
 * @returns プログレスダイアログ
 */
export const ProgressDialog = forwardRef<ProgressDialogHandles>((props, ref) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [title, setTitle] = React.useState('');

  useImperativeHandle(ref, () => ({

    /**
     * タイトルの設定
     * 
     * @param title タイトル
     */
    setTitle(title: string){
      setTitle(title);
    },

    /**
     * プログレスダイアログを開く
     * 
     */
    showProgressDialog(){
      setOpen(true);
    },

    /**
     * プログレスダイアログを閉じる
     * 
     */
    closeProgressDialog(){
      setOpen(false);
    }
  }));

  return (
    <div>
      <Dialog
        classes={{
          scrollPaper: classes.topScrollPaper,
        }}
        fullWidth={true}
        maxWidth={'md'}
        open={open}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">
            <LinearProgress />
          </DialogContentText>
        </DialogContent>
      </Dialog>
    </div>
  );
});
