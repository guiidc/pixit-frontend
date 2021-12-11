import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css'

import Home from './pages/Home';
import Register from './pages/Register';
import Consumers from './pages/Consumers';
import CreateConsumer from './pages/CreateConsumer';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/consumers" element={ <Consumers /> } />
      <Route path="/create-consumer" element={ <CreateConsumer /> } />
      {/* <Route path="/recover-password" element={ <RecoverPassword /> } /> */}
      {/* <Route path="/reset-pwd/:id/:email/:token" element={  <ResetPassword/> } /> */}
    </Routes>
  );
}

export default App;
