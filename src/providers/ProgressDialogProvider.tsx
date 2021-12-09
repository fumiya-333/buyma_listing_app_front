import { VFC, ReactNode, RefObject, createContext, createRef, useRef } from 'react';
import { ProgressDialogHandles } from '../components/ProgressDialog';

type Props = {
  children: ReactNode
};

export const ProgressDialogContext = createContext<RefObject<ProgressDialogHandles>>(createRef());

/**
 * プログレスダイアログプロバイダコンポーネント
 * 
 * @returns プログレスダイアログプロバイダテンプレート
 */
export const ProgressDialogProvider: VFC<Props> = ({ children }) => {

  /** プログレスダイアログ参照オブジェクト */
  const progressDialogRef = useRef<ProgressDialogHandles>(null);

  return (
    <ProgressDialogContext.Provider value={progressDialogRef}>
      {children}
    </ProgressDialogContext.Provider>
  );
  
}
