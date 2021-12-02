import { VFC, ReactNode } from 'react';
import { BaseTemplate } from './BaseTemplate';
import { Header } from '../components/Header';

type Props = {
  children: ReactNode
};

/**
 * ログインテンプレートコンポーネント
 * 
 * @returns ログインテンプレート
 */
export const SignInTemplate: VFC<Props> = ({ children }) => {
  return (
    <BaseTemplate>
      <Header/>
      {children}
    </BaseTemplate>
  );
}
