import './scss/app.scss';

import Cart from './pages/Cart';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';
import FullPizza from './pages/FullPizza';

import React from 'react';
import { Route, Routes } from 'react-router-dom';
import MainLayout from './components/MainLayout';

function App() {

  return (
    <Routes>
      <Route path='/' element={<MainLayout />}>
        <Route path="" element={<Home />} />
        <Route path="cart" element={<Cart />} />
        <Route path="pizza/:id" element={<FullPizza />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
