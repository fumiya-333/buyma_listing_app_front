import { VFC } from 'react';
import { Typography, Link } from '@mui/material';

type Props = {
  sx: any
};

/**
 * コピーライト用コンポーネント
 * 
 * @param props プロパティ
 * @returns コピーライト
 */
export const Cpright: VFC<Props> = (props) => {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https://mui.com/">
        Your Website
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}