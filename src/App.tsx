import { BrowserRouter} from 'react-router-dom'
import { ReactRoutes } from './ReactRouter';

export const App = () => {
  return (
    <BrowserRouter>
      <ReactRoutes/>
    </BrowserRouter>
  );
}