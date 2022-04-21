import './App.css';
import { Routes, Route } from "react-router-dom";
import React from "react";

import Home1 from './Components/Home1';
import LandingPage from './Components/LandingPage';
import Details from './Components/Details';
import FormRender from './Components/Form/FormRender';

function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home1 />} />
      <Route path='/create' element={<FormRender />} />
      <Route path='details/:id' element={<Details />} />
    </Routes>


  );
}

export default App;
