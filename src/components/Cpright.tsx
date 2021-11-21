import { Typography, Link } from '@mui/material';

/**
 * コピーライト用コンポーネント
 * 
 * @param props プロパティ
 * @returns コピーライト
 */
export function Cpright(props: any) {
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