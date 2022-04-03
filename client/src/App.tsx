import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import Home from './pages/HomePage';
import NewGame from './pages/NewGamePage';
import DummyGame from './pages/DummyGamePage';

import { BrowserRouter, Route, Routes } from "react-router-dom";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/newgame" element={<NewGame />} />
        <Route path="/dummygame" element={<DummyGame />} />
      </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
