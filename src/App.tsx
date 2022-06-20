import { Routes, Route } from "react-router-dom";
import React from "react";

import { Header } from "./components";
import { Home, NotFound } from "./pages";

const Cart = React.lazy(
  () => import(/* webpackChunckName: "Cart" */ "./pages/Cart")
);
const FullPizza = React.lazy(
  () => import(/* webpackChunckName: "FullPizza" */ "./pages/FullPizza")
);

import "./scss/app.scss";

function App() {
  return (
    <div className="wrapper">
      <Header />

      <div className="content">
        <div className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route
              path="/cart"
              element={
                // работает вместе с React.lazy
                <React.Suspense fallback={<div>Идет загрузка...</div>}>
                  <Cart />
                </React.Suspense>
              }
            />
            <Route
              path="/pizzas/:id"
              element={
                <React.Suspense fallback={<div>Идет загрузка...</div>}>
                  <FullPizza />
                </React.Suspense>
              }
            />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}

export default App;
