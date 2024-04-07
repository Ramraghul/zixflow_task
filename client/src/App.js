import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

//Components
import Table from './components/table/Table';
import CreateContact from './components/contact/CreateContact';


//App Route
const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<Table />} />
        <Route path='/createContact' element={<CreateContact />} />
      </Routes>
    </BrowserRouter>
  );
};

//App Export;
export default App;
