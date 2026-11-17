import React from 'react';
import {BrowserRouter, Routes, Route} from 'react-router-dom';


import Principal from './paginas/Principal/Principal';
import Cadastro from './paginas/Cadastro/Cadastro';
import Login from './paginas/Login/Login';
function AppRoutes(){
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Principal />} />
        <Route path="/login" element={<Login />} />
        <Route path="/cadastro" element={<Cadastro />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;