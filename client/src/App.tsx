import React from 'react';
import logo from './logo.svg';
import './App.css';
import SignIn from './pages/SignInPage';
import SignUp from './pages/SignUpPage';
import Home from './pages/HomePage';
import NewGame from './pages/NewGamePage';
import Lobby from './pages/LobbyPage';
import Profile from './pages/ProfilePage';
import Stats from './pages/StatsPage';
import Settings from './pages/SettingsPage';

import { BrowserRouter, Route, Routes } from "react-router-dom";

import useMediaQuery from './useMediaQuery';
import Media from 'react-media';


function App() {
  const matches = useMediaQuery(("min-width: 600px"));

  return (
    <div className="App">
      {matches ?  "Hello" :
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/signin" element={<SignIn />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/newgame" element={<NewGame />} />
          <Route path="/lobby/:type/:code" element={<Lobby />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/stats" element={<Stats />} />
          <Route path="/settings" element={<Settings />} />
        </Routes>
      </BrowserRouter>}
    </div>
  );
}

export default App;
