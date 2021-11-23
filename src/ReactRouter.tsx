import { Route, Routes } from 'react-router-dom'
import { Listing } from './pages/listing/Listing';
import { Contacts } from './pages/contacts/Contacts';
import { IncomeManagement } from './pages/income_management/IncomeManagement';
import { Manual } from './pages/manual/Manual';
import { Setting } from './pages/setting/Setting';
import { SignIn } from './pages/signIn/SignIn';
import { PrivateRoute } from './PrivateRoute';
import * as AppConstants from './commons/AppConstants';

export const ReactRoutes = () => {
  return (
    <Routes>
      <Route path={ AppConstants.END_POINT_LISTING } element={<PrivateRoute><Listing/></PrivateRoute>}/>
      <Route path={ AppConstants.END_POINT_CONTACTS } element={<PrivateRoute><Contacts/></PrivateRoute>}/>
      <Route path={ AppConstants.END_POINT_INCOME_MANGEGEMENT } element={<PrivateRoute><IncomeManagement/></PrivateRoute>}/>
      <Route path={ AppConstants.END_POINT_MANUAL } element={<PrivateRoute><Manual/></PrivateRoute>}/>
      <Route path={ AppConstants.END_POINT_SETTING } element={<PrivateRoute><Setting/></PrivateRoute>}/>
      <Route path={ AppConstants.END_POINT_SIGN_IN } element={<SignIn/>} />
    </Routes>
  );
}