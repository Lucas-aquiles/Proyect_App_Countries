import './App.css';
import { Routes, Route } from "react-router-dom";
import React from "react";

import Home1 from './Components/Home1';
import LandingPage from './Components/LandingPage';

import { Provider } from "react-redux";
import store from "./store/index";

function App() {
  return (
    <Provider store={store}>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/home" element={<Home1 />} />
        {/* <Route path='/create' element={<Form />} /> */}
        {/* <Route path='details/:id' element={<Details />} /> */}
      </Routes>
    </Provider>


  );
}

export default App;
