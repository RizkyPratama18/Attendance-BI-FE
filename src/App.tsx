import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormCreateReport from './FormCreateReport';
import TopNavbar from './TopNavbar';
import {SignIn} from './SignIn';


const App: React.FC = () => {

  return (
    <Router>
      <TopNavbar/>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/Syncronize" element={<FormCreateReport />} />
      </Routes>
    </Router>
  );
};

export default App;
