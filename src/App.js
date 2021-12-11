import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './index.css'

import Home from './pages/Home';
import Register from './pages/Register';
import Consumers from './pages/Consumers';
import CreateConsumer from './pages/CreateConsumer';
import PasswordRecover from './pages/PasswordRecover';
import PasswordReset from './pages/PasswordReset';
import ConsumerDetails from './pages/ConsumerDetails';

function App() {
  return (
    <Routes>
      <Route path="/" element={ <Home /> } />
      <Route path="/register" element={ <Register /> } />
      <Route path="/consumers" element={ <Consumers /> } />
      <Route path="/create-consumer" element={ <CreateConsumer /> } />
      <Route path="/consumers/:id" element={ <ConsumerDetails /> } />
      <Route path="/password-recover" element={ <PasswordRecover /> } />
      <Route path="/password-reset/:id/:email/:token" element={  <PasswordReset/> } />
    </Routes>
  );
}

export default App;
