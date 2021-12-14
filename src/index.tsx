import { StrictMode } from 'react';
import ReactDOM from 'react-dom';
import { App } from './App';
import { CookiesProvider } from 'react-cookie';
import { WarningMessageProvider } from './providers/WarningMessageProvider';
import { ProgressDialogProvider } from './providers/ProgressDialogProvider';
import './index.css';

ReactDOM.render(
  <StrictMode>
    <CookiesProvider>
      <WarningMessageProvider>
        <ProgressDialogProvider>
          <App />
        </ProgressDialogProvider>
      </WarningMessageProvider>
    </CookiesProvider>
  </StrictMode>,
  document.getElementById('root')
);
