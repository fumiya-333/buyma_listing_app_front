import { VFC, ReactNode } from 'react';
import { BaseTemplate } from './BaseTemplate';
import { Header } from '../components/Header';
import { Sidebar } from '../components/Sidebar';

type Props = {
  children: ReactNode
};

/**
 * サインアップテンプレートコンポーネント
 * 
 * @returns サインアップテンプレート
 */
export const SignUpTemplate: VFC<Props> = ({ children }) => {
  return (
    <BaseTemplate>
      <Header/>
      <Sidebar />
      {children}
    </BaseTemplate>
  );
}
