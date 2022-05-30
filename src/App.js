import { Routes, Route } from "react-router-dom";
import React from 'react';

import Header from './components/Header';
import Home from './pages/Home';
import Cart from "./pages/Cart";



import './scss/app.scss';
import NotFound from "./pages/NotFound";

function App() {
  const [searchValue, setSearchValue] = React.useState('')

  return (
    <div className="wrapper">
      <Header
        setSearchValue={setSearchValue}
        searchValue={searchValue} />

      <div className="content">
        <div className="container">
          <Routes>
            <Route path='/' element={<Home searchValue={searchValue}/>} />
            <Route path='/cart' element={<Cart />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
