import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import FormCreateReport from './FormCreateReport';
import FormCreateJob from './FormCreateJob';
import TopNavbar from './TopNavbar';
import {SignIn} from './SignIn';


const App: React.FC = () => {

  return (
    <Router>
      <TopNavbar/>
      <Routes>
        <Route path="/" element={<SignIn/>} />
        <Route path="/CreateReport" element={<FormCreateReport />} />
        <Route path="/CreateJob" element={<FormCreateJob />} />
      </Routes>
    </Router>
  );
};

export default App;
