import { BrowserRouter} from 'react-router-dom'
import { ReactRoutes } from './ReactRoutes';

export const App = () => {
  return (
    <BrowserRouter>
      <ReactRoutes/>
    </BrowserRouter>
  );
}