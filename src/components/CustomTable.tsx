import { VFC, ForwardedRef, ChangeEvent, useState, forwardRef, useImperativeHandle, useCallback } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import { makeStyles } from '@mui/styles';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

type Props = {
  ref: ForwardedRef<CustomTableHandles>
};

const useStyles = makeStyles({
  table: {
    width: '100%',
    borderRadius: '4px',
    borderCollapse: 'collapse',
    borderSpacing: 0,
    minWidth: '650px',
    overflowX: 'auto',
    boxShadow: '0.5px 0.5px 3px gray',
    '& .css-o9k5xi-MuiInputBase-root-MuiOutlinedInput-root, .css-9ddj71-MuiInputBase-root-MuiOutlinedInput-root': {
      height: '45px!important'
    }
  },
  thead: {
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  tbody: {
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  tr: {
    borderCollapse: 'collapse',
    borderSpacing: 0
  },
  th: {
    textAlign: 'left',
    fontSize: '0.875rem',
    padding: '14px',
    borderBottom: '1px solid #dcdcdc'
  },
  td: {
    fontWeight: 500,
    fontSize: '0.875rem',
    borderBottom: '1px solid #dcdcdc'
  },
});

export interface CustomTableHandles {
  setCols(_cols: string[]): void,
  setRows(_rows: {[key: string]: {}}[]): void,
  filteredRows(regex: RegExp): void,
  setSelects(objects: {[key: string]: {}}): void,
  setIsDatePickers(datePickers: boolean[]): void,
  setWidths(widths: string[]): void,
  setIsHiddenCols(isHiddenCols: boolean[]): void,
  setIsEditCols(isEditCols: boolean[]): void,
  setOnChangeCell(onChangeCell: {　(rowIdx: number, col: string, colIdx: number) :void }): void
}

interface onChangeCellCallback{ (rowIdx: number, col: string, colIdx: number) :void　};

/**
 * カスタムテーブルコンポーネント
 * 
 * @param props プロパティ
 * @param ref コンポーネント参照オブジェクト
 * @returns カスタムテーブル
 */
export const CustomTable: VFC<Props> = forwardRef<CustomTableHandles>((props, ref) => {

  const classes = useStyles();

  /** テーブル列 */
  const [cols, setCols] = useState<string[]>([]);
  /** テーブル行 */
  const [rows, setRows] = useState<{[key: string]: {}}[]>([]);
  /** フィルター用テーブル行 */
  const [filteredRows, setFilteredRows] = useState<{[key: string]: {}}[]>([]);
  /** コンボボックス */
  const [selects, setSelects] = useState<{[key: string]: {}}>({});
  /** 日付入力テキスト */
  const [isDatePickers, setIsDatePickers] = useState<boolean[]>([]);
  /** 横幅 */
  const [widths, setWidths] = useState<string[]>([]);
  /** 非表示列 */
  const [isHiddenCols, setIsHiddenCols] = useState<boolean[]>([]);
  /** 編集列  */
  const [isEditCols, setIsEditCols] = useState<boolean[]>([]);
  /** セル入力イベント */
  const [onChangeCell, setOnChangeCell] = useState<onChangeCellCallback>();

  useImperativeHandle(ref, () => ({

    /**
     * テーブル列の設定
     * 
     * @param _cols テーブル列
     */
    setCols(_cols: string[]){
      setCols(_cols);
    },

    /**
     * テーブル行の設定
     * 
     * @param _rows テーブル行
     */
    setRows(_rows: {[key: string]: {}}[]){
      setRows(_rows);
      setFilteredRows(_rows);
    },

    /**
     * フィルター用テーブル行の設定
     * 
     * @param regex 正規表現
     */
    filteredRows(regex: RegExp){
      const filteredRows = rows.filter((row) => {
        return Object.keys(row).some((field) => {
          return row[field] ? regex.test(row[field].toString()) : false;
        });
      });
      setFilteredRows(filteredRows);
    },

    /**
     * コンボボックスの設定
     * 
     * @param selects コンボボックス
     */
    setSelects(selects: {[key: string]: {}}){
      setSelects(selects);
    },

    /**
     * 日付入力テキストの設定
     * 
     * @param datePickers 日付入力テキスト
     */
    setIsDatePickers(datePickers: boolean[]){
      setIsDatePickers(datePickers);
    },

    /**
     * 横幅の設定
     * 
     * @param widths 横幅
     */
    setWidths(widths: string[]){
      setWidths(widths);
    },

    /**
     * 非表示列の設定
     * 
     * @param hiddenCols 非表示列
     */
    setIsHiddenCols(hiddenCols: boolean[]){
      setIsHiddenCols(hiddenCols);
    },

    /**
     * 編集列の設定
     * 
     * @param isEditCols 編集列
     */
    setIsEditCols(isEditCols: boolean[]){
      setIsEditCols(isEditCols);
    },

    /**
     * セル入力イベントの設定
     * 
     * @param onChangeCell セル入力イベント
     */
    setOnChangeCell(onChangeCell: onChangeCellCallback){
      setOnChangeCell(onChangeCell);
    }
  }));

  /**
   * 行の更新
   * 
   * @param rowIdx 行番号
   * @param col 列
   * @param colIdx 列番号
   * @param value 入力値
   */
  const updateRows = useCallback((rowIdx: number, col: string, colIdx: number, value: string | Date | null) => {

    if(!value){
      value = '';
    }

    const _rows = [...rows];
    _rows[rowIdx] = { ..._rows[rowIdx], [col]: value }
    setRows(_rows);

    const _renderRows = [...filteredRows];
    _renderRows[rowIdx] = { ..._renderRows[rowIdx], [col]: value }
    setFilteredRows(_renderRows);

    if(onChangeCell){
      onChangeCell(rowIdx, col, colIdx);
    }
  }, [rows, filteredRows, setRows, setFilteredRows, onChangeCell]);

  /**
   * テキストボックスの入力イベント
   * 
   * @param rowIdx 行番号
   * @param col 列
   * @param colIdx 列番号
   */
  const onChangeTextHandler = useCallback((rowIdx: number, col: string, colIdx: number) => (e: ChangeEvent<HTMLInputElement>) =>  {
    updateRows(rowIdx, col, colIdx, e.target.value);
  }, [updateRows]);

  /**
   * 日付入力テキストの入力イベント
   * 
   * @param rowIdx 行番号
   * @param col 列
   * @param colIdx 列番号
   * @param value 入力値
   */
  const onChangeDatePickerHandler = useCallback((rowIdx: number, col: string, colIdx: number, value: Date | null) => {
    updateRows(rowIdx, col, colIdx, value);
  }, [updateRows]);


  return (
    <table className={classes.table}>
      <thead className={classes.thead}>
        <tr className={classes.tr}>
          {cols.map((col, colIdx) => (
            isHiddenCols.length > 0 && isHiddenCols[colIdx] &&
            <th className={classes.th} style={ widths && { width: widths[colIdx] } } key={`head_row_${colIdx}`}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className={classes.tbody}>
        {filteredRows.map((row, rowIdx) => (
          <tr className={classes.tr} key={`body_row_${rowIdx}`}>
            {Object.keys(row).map((col, colIdx) => (
              isHiddenCols.length > 0 && isHiddenCols[colIdx] &&
                <td className={classes.td} key={`col_${rowIdx}_${colIdx}`} style={ widths && { width: widths[colIdx], padding: isEditCols[colIdx] ? '8px 14px' : '14px' } }>
                  {isEditCols[colIdx]
                    ? col in selects
                      ? <TextField
                          id="outlined-select-currency"
                          select
                          value={row[col]}
                          style={ widths && { width: widths[colIdx] } }
                          onChange={onChangeTextHandler(rowIdx, col, colIdx)}
                          key={`col_child_${rowIdx}_${colIdx}`}
                        >
                          {Object.values(selects[col]).map((option, optionIdx) => (
                            <MenuItem key={`option_${rowIdx}_${colIdx}_${optionIdx}`} value={(Object.values(option as object) as number[] | string[])[0]}>
                              {(Object.values(option as object) as number[] | string[])[1]}
                            </MenuItem>
                          ))}
                        </TextField>
                      : isDatePickers[colIdx]
                        ? <LocalizationProvider key={`col_child_${rowIdx}_${colIdx}`} dateAdapter={AdapterDateFns}>
                            <DesktopDatePicker
                              inputFormat="yyyy/MM/dd"
                              value={(row[col] as Date)}
                              onChange={(value: Date | null) => (onChangeDatePickerHandler(rowIdx, col, colIdx, value))}
                              renderInput={(params) => <TextField {...params} sx={{ width: 150 }}/>}
                            />
                          </LocalizationProvider>
                        : <TextField
                            value={row[col]}
                            onChange={onChangeTextHandler(rowIdx, col, colIdx)}
                            variant="standard"
                            key={`col_child_${rowIdx}_${colIdx}`}
                          />
                    : row[col]
                  }
                </td>
            ))}
          </tr>
        ))}
      </tbody>
    </table>
  );
});
