import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import Home from './pages/HomePage';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
