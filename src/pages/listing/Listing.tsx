import { VFC, useContext, useEffect } from 'react';
import { Box, Toolbar, Button } from '@mui/material';
import ViewColumnIcon from '@mui/icons-material/ViewColumn';
import { SignUpTemplate } from '../../templates/SignUpTemplate';
import { WarningMessageContext, ProgressDialogContext, CustomTableContext } from '../../templates/BaseTemplate';
import { WarningMessage } from '../../components/WarningMessage';
import { ProgressDialog } from '../../components/ProgressDialog';
import { CustomTable } from '../../components/CustomTable';
import { SearchText } from '../../components/SearchText';

type Props = {};

/**
 * 出品リスト画面用コンポーネント
 * 
 * @returns 出品リスト画面
 */
export const Listing: VFC<Props> = () => {

  /** 警告メッセージ 参照オブジェクト */
  const warningMessageRef = useContext(WarningMessageContext);
  /** プログレスダイアログ 参照オブジェクト */
  const progressDialogRef = useContext(ProgressDialogContext);
  /** テーブル参照オブジェクト */
  const customTableRef = useContext(CustomTableContext);

  useEffect(() => {
    const prefectures = {
      prefectures: [{ key: 1, value: "北海道"},
      { key: 2, value: "青森県"},
      { key: 3, value: "岩手県"},
      { key: 4, value: "宮城県"},
      { key: 5, value: "秋田県"},
      { key: 6, value: "山形県"},
      { key: 7, value: "福島県"},
      { key: 8, value: "茨城県"},
      { key: 9, value: "栃木県"},
      { key: 10, value: "群馬県"},
      { key: 11, value: "埼玉県"},
      { key: 12, value: "千葉県"},
      { key: 13, value: "東京都"},
      { key: 14, value: "神奈川県"},
      { key: 15, value: "新潟県"},
      { key: 16, value: "富山県"},
      { key: 17, value: "石川県"},
      { key: 18, value: "福井県"},
      { key: 19, value: "山梨県"},
      { key: 20, value: "長野県"},
      { key: 21, value: "岐阜県"},
      { key: 22, value: "静岡県"},
      { key: 23, value: "愛知県"},
      { key: 24, value: "三重県"},
      { key: 25, value: "滋賀県"},
      { key: 26, value: "京都府"},
      { key: 27, value: "大阪府"},
      { key: 28, value: "兵庫県"},
      { key: 29, value: "奈良県"},
      { key: 30, value: "和歌山県"},
      { key: 31, value: "鳥取県"},
      { key: 32, value: "島根県"},
      { key: 33, value: "岡山県"},
      { key: 34, value: "広島県"},
      { key: 35, value: "山口県"},
      { key: 36, value: "徳島県"},
      { key: 37, value: "香川県"},
      { key: 38, value: "愛媛県"},
      { key: 39, value: "高知県"},
      { key: 40, value: "福岡県"},
      { key: 41, value: "佐賀県"},
      { key: 42, value: "長崎県"},
      { key: 43, value: "熊本県"},
      { key: 44, value: "大分県"},
      { key: 45, value: "宮崎県"},
      { key: 46, value: "鹿児島県"},
      { key: 47, value: "沖縄県"}]};
    const datePickers = [false,false,false,false,false,true];
    const widths = ['80px','100px','100px','100px','200px',''];
    const isHiddenCols = [false, true, true, true, true, true];
    const isEditCols = [false, false, true, true, true, true];
    const cols = ['ID','lastvalue','firstvalue','age','prefecture','date'];
    const rows = [
      { id: 1, lastvalue: 'Snow', firstvalue: 'Jon', age: 35, prefectures: "1", date: '2021/11/28' },
      { id: 2, lastvalue: 'Lannister', firstvalue: 'Cersei', age: 42, prefectures: "1", date: '2021/11/28' },
      { id: 3, lastvalue: 'Lannister', firstvalue: 'Jaime', age: 45, prefectures: "2", date: '2021/11/28' },
      { id: 4, lastvalue: 'Stark', firstvalue: 'Arya', age: 16, prefectures: "2", date: '2021/11/28' },
      { id: 5, lastvalue: 'Targaryen', firstvalue: 'Daenerys', age: 23, prefectures: "3", date: '2021/11/28' },
      { id: 6, lastvalue: 'Melisandre', firstvalue: 'abc', age: 150, prefectures: "4", date: '2021/11/28' },
      { id: 7, lastvalue: 'Clifford', firstvalue: 'Ferrara', age: 44, prefectures: "5", date: '2021/11/28' },
      { id: 8, lastvalue: 'Frances', firstvalue: 'Rossini', age: 36, prefectures: "6", date: '2021/11/28' },
      { id: 9, lastvalue: 'Roxie', firstvalue: 'Harvey', age: 65, prefectures: "7", date: '2021/11/28' },
    ];

    customTableRef.current?.setSelects(prefectures);
    customTableRef.current?.setIsDatePickers(datePickers);
    customTableRef.current?.setWidths(widths);
    customTableRef.current?.setIsHiddenCols(isHiddenCols);
    customTableRef.current?.setIsEditCols(isEditCols);
    customTableRef.current?.setCols(cols);
    customTableRef.current?.setRows(rows);
  }, [customTableRef]);

  return (
    <SignUpTemplate>
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        <div style={{ position: 'relative', marginBottom: 20 }}>
          <Button color="primary" aria-label="search" size="small" sx={{ mr: 3 }}>
            <ViewColumnIcon /><b style={{ fontSize: 14 }}>&nbsp;カラム設定</b>
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mr: 2 }}
          >
            データ読み込み
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mr: 2 }}
          >
            自動出品
          </Button>
          <Button
            type="submit"
            variant="contained"
            sx={{ mr: 2 }}
          >
            更新
          </Button>
          <div style={{ position: 'absolute', right: 0, top: 0 }}>
            <SearchText placeholder='検索' execFilter={(searchRegex: RegExp) => customTableRef.current?.filteredRows(searchRegex)}/>
          </div>
        </div>
        <CustomTable ref={customTableRef}/>
        <WarningMessage ref={warningMessageRef}/>
        <ProgressDialog ref={progressDialogRef}/>
      </Box>
    </SignUpTemplate>
  );
}
