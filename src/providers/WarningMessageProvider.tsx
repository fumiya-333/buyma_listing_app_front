import { VFC, ReactNode, RefObject, createContext, createRef, useRef } from 'react';
import { WarningMessageHandles } from '../components/WarningMessage';

type Props = {
  children: ReactNode
};

export const WarningMessageContext = createContext<RefObject<WarningMessageHandles>>(createRef());

/**
 * 警告メッセージプロバイダコンポーネント
 * 
 * @returns 警告メッセージプロバイダ
 */
export const WarningMessageProvider: VFC<Props> = ({ children }) => {

  /** 警告メッセージ参照オブジェクト */
  const warningMessageRef = useRef<WarningMessageHandles>(null);

  return (
    <WarningMessageContext.Provider value={warningMessageRef}>
      {children}
    </WarningMessageContext.Provider>
  );
  
}
