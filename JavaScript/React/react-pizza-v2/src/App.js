import './scss/app.scss';

import Header from './components/Header'
import Cart from './pages/Cart';
import { Home } from './pages/Home';
import { NotFound } from './pages/NotFound';

import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AppContext from './context/context';

import { useSelector, useDispatch } from 'react-redux';

function App() {

  const count = useSelector((state) => state.counter.value)
  const dispatch = useDispatch()

  const [searchValue, setSearchValue] = React.useState("");

  return (
    <AppContext.Provider
      value={{
        searchValue,
        setSearchValue
      }}>
      <div className="wrapper">
        <Header />
        <div className="content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </AppContext.Provider>
  );
}

export default App;
