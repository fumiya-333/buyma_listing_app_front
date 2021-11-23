import { VFC } from 'react';
import { BrowserRouter} from 'react-router-dom'
import { ReactRoutes } from './ReactRoutes';

type Props = {};

export const App: VFC<Props> = () => {
  return (
    <BrowserRouter>
      <ReactRoutes/>
    </BrowserRouter>
  );
}