import { VFC, ForwardedRef, ChangeEvent, useState, forwardRef, useImperativeHandle } from 'react';
import { TextField, MenuItem } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/lab';
import AdapterDateFns from '@mui/lab/AdapterDateFns';

type Props = {
  ref: ForwardedRef<CustomTableHandles>
};

export interface CustomTableHandles {
  setCols(_cols: string[]): void,
  setRows(_rows: {[key: string]: {}}[]): void,
  filteredRows(regex: RegExp): void,
  setSelects(objects: {}): void,
  setIsDatePickers(datePickers: boolean[]): void,
  setWidths(widths: string[]): void,
  setIsHiddenCols(isHiddenCols: boolean[]): void,
  setIsEditCols(isEditCols: boolean[]): void,
}

export const CustomTable: VFC<Props> = forwardRef<CustomTableHandles>((props, ref) => {
  const [cols, setCols] = useState<string[]>([]);
  const [rows, setRows] = useState<{[key: string]: {}}[]>([]);
  const [filteredRows, setFilteredRows] = useState<{[key: string]: {}}[]>([]);
  const [selects, setSelects] = useState<{[key: string]: {}}>({});
  const [isDatePickers, setIsDatePickers] = useState<boolean[]>([]);
  const [widths, setWidths] = useState<string[]>([]);
  const [isHiddenCols, setIsHiddenCols] = useState<boolean[]>([]);
  const [isEditCols, setIsEditCols] = useState<boolean[]>([]);

  useImperativeHandle(ref, () => ({

    setCols(_cols: string[]){
      setCols(_cols);
    },

    setRows(_rows: {[key: string]: {}}[]){
      setRows(_rows);
      setFilteredRows(_rows);
    },

    filteredRows(regex: RegExp){
      const filteredRows = rows.filter((row) => {
        return Object.keys(row).some((field) => {
          return row[field] ? regex.test(row[field].toString()) : false;
        });
      });
      setFilteredRows(filteredRows);
    },

    setSelects(objects: {}){
      setSelects(objects);
    },

    setIsDatePickers(datePickers: boolean[]){
      setIsDatePickers(datePickers);
    },

    setWidths(widths: string[]){
      setWidths(widths);
    },

    setIsHiddenCols(filteredCols: boolean[]){
      setIsHiddenCols(filteredCols);
    },

    setIsEditCols(isEditCols: boolean[]){
      setIsEditCols(isEditCols);
    }
  }));

  const onChangeTextHandler = (rowIdx: number, col: string) => (e: ChangeEvent<HTMLInputElement>) =>  {
    updateRows(rowIdx, col, e.target.value);
  }

  const onChangeDatePickerHandler = (rowIdx: number, col: string, value: Date | null) => {
    updateRows(rowIdx, col, value);
  }

  const updateRows = (rowIdx: number, col: string, value: string | Date | null) => {

    if(!value){
      value = '';
    }

    const _rows = [...rows];
    _rows[rowIdx] = { ..._rows[rowIdx], [col]: value }
    setRows(_rows);

    const _renderRows = [...filteredRows];
    _renderRows[rowIdx] = { ..._renderRows[rowIdx], [col]: value }
    setFilteredRows(_renderRows);
  }

  return (
    <table className="table">
      <thead className="thead">
        <tr className="tr">
          {cols.map((col, colIdx) => (
            isHiddenCols.length > 0 && isHiddenCols[colIdx] &&
            <th className="th" style={ widths && { width: widths[colIdx] } } key={colIdx}>{col}</th>
          ))}
        </tr>
      </thead>
      <tbody className="tbody">
        {filteredRows.map((row, rowIdx) => (
          <tr className="tr" key={rowIdx}>
            {Object.keys(row).map((col, colIdx) => (
              isHiddenCols.length > 0 && isHiddenCols[colIdx] &&
                <td className="td" key={colIdx} style={ widths && { width: widths[colIdx] ,padding: isEditCols[colIdx] ? '8px 14px' : '14px' } }>
                  {isEditCols[colIdx] 
                    ? Object.keys(selects).map((selectKey, selectIdx) => (
                      col === selectKey
                        ? <TextField
                            id="outlined-select-currency"
                            select
                            value={row[col]}
                            style={ widths && { width: widths[colIdx] } }
                            onChange={onChangeTextHandler(rowIdx, col)}
                            key={selectIdx}
                          >
                            {Object.values(selects[selectKey]).map((option, optionIdx) => (
                              <MenuItem key={optionIdx} value={(Object.values(option as object) as number[] | string[])[0]}>
                                {(Object.values(option as object) as number[] | string[])[1]}
                              </MenuItem>
                            ))}
                          </TextField>
                          : isDatePickers[colIdx]
                            ? <LocalizationProvider dateAdapter={AdapterDateFns}>
                                <DesktopDatePicker
                                  inputFormat="yyyy/MM/dd"
                                  value={(row[col] as Date)}
                                  onChange={(value: Date | null) => (onChangeDatePickerHandler(rowIdx, col, value))}
                                  renderInput={(params) => <TextField {...params} sx={{ width: 150 }}/>}
                                />
                              </LocalizationProvider>
                            : <TextField onChange={onChangeTextHandler(rowIdx, col)} variant="standard" value={row[col]}/>
                    ))
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
