import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';

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