import { VFC, ReactNode, RefObject, createContext, createRef, useRef } from 'react';
import { Box } from '@mui/material';
import { WarningMessageHandles } from '../components/WarningMessage';
import { ProgressDialogHandles } from '../components/ProgressDialog';
import { CustomTableHandles } from '../components/CustomTable';

type Props = {
  children: ReactNode
};

export const WarningMessageContext = createContext<RefObject<WarningMessageHandles>>(createRef());
export const ProgressDialogContext = createContext<RefObject<ProgressDialogHandles>>(createRef());
export const CustomTableContext = createContext<RefObject<CustomTableHandles>>(createRef());

/**
 * ベーステンプレートコンポーネント
 * 
 * @returns ベーステンプレート
 */
export const BaseTemplate: VFC<Props> = ({ children }) => {
  /** 警告メッセージ参照オブジェクト */
  const warningMessageRef = useRef<WarningMessageHandles>(null);
  /** プログレスダイアログ参照オブジェクト */
  const progressDialogRef = useRef<ProgressDialogHandles>(null);
  /** テーブル参照オブジェクト */
  const customTableRef = useRef<CustomTableHandles>(null);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <WarningMessageContext.Provider value={warningMessageRef}>
          <ProgressDialogContext.Provider value={progressDialogRef}>
            <CustomTableContext.Provider value={customTableRef}>
              {children}
            </CustomTableContext.Provider>
          </ProgressDialogContext.Provider>
        </WarningMessageContext.Provider>
      </Box>
    </>
  );
  
}
