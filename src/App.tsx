import React from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Listing } from './pages/listing/Listing';
import { Contacts } from './pages/contacts/Contacts';
import { IncomeManagement } from './pages/income_management/IncomeManagement';
import { Manual } from './pages/manual/Manual';
import { Setting } from './pages/setting/Setting';
import { SignIn } from './pages/signup/SignIn';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/listing" element={<Listing/>} />
        <Route path="/contacts" element={<Contacts/>} />
        <Route path="/income_management" element={<IncomeManagement/>} />
        <Route path="/manual" element={<Manual/>} />
        <Route path="/setting" element={<Setting/>} />
      </Routes>
    </BrowserRouter>
  );
}
