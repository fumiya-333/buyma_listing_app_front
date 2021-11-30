import { VFC, ChangeEvent, useState, useCallback } from 'react';
import { TextField, IconButton } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import SearchIcon from '@mui/icons-material/Search';
import { createTheme } from '@mui/material/styles';
import { createStyles, makeStyles } from '@mui/styles';
import { escapeRegExp } from '../commons/StringUtil';
import * as AppContants from '../commons/AppConstants';

type Props = {
  placeholder?: string,
  execFilter?(searchRegex: RegExp): void
};

const defaultTheme = createTheme();
const useStyles = makeStyles(
  (theme) =>
    createStyles({
      root: {
        padding: theme.spacing(0.5, 0.5, 0),
        justifyContent: 'space-between',
        display: 'flex',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
      },
      textField: {
        [theme.breakpoints.down('xs')]: {
          width: '100%',
        },
        margin: theme.spacing(1, 0.5, 1.5),
        '& .MuiSvgIcon-root': {
          marginRight: theme.spacing(0.5),
        },
        '& .MuiInput-underline:before': {
          borderBottom: `1px solid ${theme.palette.divider}`,
        },
      },
    }),
  { defaultTheme },
);

/**
 * 検索テキスト用コンポーネント
 * 
 * @param props プロパティ
 * @returns 検索テキスト
 */
export const SearchText: VFC<Props> = (props) => {
  const classes = useStyles();
  /** 検索入力値 */
  const [value, setValue] = useState('');

  /**
   * 検索処理実行
   * 
   * @param 検索文字列
   */
  const execSearch = useCallback((s: string) => {
    setValue(s);
    const searchRegex = new RegExp(escapeRegExp(s), AppContants.REG_EXP_FLG_I);

    if(props.execFilter){
      props.execFilter(searchRegex);
    }
  }, [props, setValue]);

  /**
   * 検索処理
   * 
   * @param e 入力イベント
   */
  const procSearch = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    execSearch(e.target.value);
  }, [execSearch]);

  /**
   * 検索テキスト初期化
   * 
   */
  const clearSearch = useCallback(() => {
    execSearch('');
  }, [execSearch]);

  return (
    <TextField
      variant="standard"
      value={value}
      onChange={procSearch}
      placeholder={props.placeholder}
      className={classes.textField}
      InputProps={{
        startAdornment: <SearchIcon fontSize="small" />,
        endAdornment: (
          <IconButton
            title="Clear"
            aria-label="Clear"
            size="small"
            style={{ visibility: value ? 'visible' : 'hidden' }}
            onClick={clearSearch}
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        ),
      }}
    />
  );
}