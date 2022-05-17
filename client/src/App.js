import './App.css';
import { Routes, Route } from "react-router-dom";
import React from "react";

import Home1 from './Components/Home/Home1';
import LandingPage from './Components/LandingPage/LandingPage';
import Details from './Components/Details/Details';
import FormRender from './Components/Form/FormRender';
import Favorite from './Components/Favorite/Favorite';
import Sorpresa from './Components/Sorpresa/Sorpresa';
// import Ver from './Components/Ver.js';

function App() {
  return (
    <Routes>
      {/* <Route path="/" element={<Ver />} /> */}

      <Route path="/" element={<LandingPage />} />
      <Route path="/home" element={<Home1 />} />
      <Route path='/create' element={<FormRender />} />
      <Route path='details/:id' element={<Details />} />
      <Route path='/favorite' element={<Favorite />} />
      <Route path='/question' element={<Sorpresa />} />
    </Routes>


  );
}

export default App;
