import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './Com/Login';
import Home from './Com/Home';
import Registetion from './Com/Registetion';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Registetion/>} />
        <Route path="/login" element={<Login />} />
        <Route path="/home" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
