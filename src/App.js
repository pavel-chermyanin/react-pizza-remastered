
import Categories from './components/Categories';
import Header from './components/Header';
import PizzaBlock from './components/PizzaBlock';
import Sort from './components/Sort';
import Preloader from './components/PizzaBlock/Preloader';

import './scss/app.scss';

import items from './assets/pizzas.json'
import React from 'react';


function App() {

  const [pizzas, setPizzas] = React.useState([])

  React.useEffect(() => {
    fetch('https://628e5bff368687f3e715b43f.mockapi.io/pizzas')
      .then(response => response.json())
      .then(data => setPizzas(data))
  }, [])


  return (
    <div className="wrapper">
      <Header />
      <div className="content">
        <div className="container">
          <div className="content__top">
            <Categories />
            <Sort />

          </div>
          <h2 className="content__title">Все пиццы</h2>
          <div className="content__items">

            {
              pizzas.map((obj, index) => (
                <PizzaBlock
                  key={index}
                  {...obj} />
                // <Preloader />
              ))
            }
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
