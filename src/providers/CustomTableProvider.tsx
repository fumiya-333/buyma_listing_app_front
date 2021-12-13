import { VFC, ReactNode, RefObject, createContext, createRef, useRef } from 'react';
import { CustomTableHandles } from '../components/CustomTable';

type Props = {
  children: ReactNode
};

export const CustomTableContext = createContext<RefObject<CustomTableHandles>>(createRef());

/**
 * カスタムテーブルプロバイダコンポーネント
 * 
 * @returns カスタムテーブルプロバイダテンプレート
 */
export const CustomTableProvider: VFC<Props> = ({ children }) => {

  /** テーブル参照オブジェクト */
  const customTableRef = useRef<CustomTableHandles>(null);

  return (
    <CustomTableContext.Provider value={customTableRef}>
      {children}
    </CustomTableContext.Provider>
  );
  
}
