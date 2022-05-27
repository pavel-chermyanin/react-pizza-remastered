
import React from 'react'

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Preloader from '../components/PizzaBlock/Preloader';

const Home = () => {
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)

    React.useEffect(() => {
        fetch('https://628e5bff368687f3e715b43f.mockapi.io/pizzas')
            .then(response => response.json())
            .then(data => {
                setPizzas(data)
                setLoading(false)
            })
    }, [])
    return (
        <>
            <div className="content__top">
                <Categories />
                <Sort />

            </div>
            <h2 className="content__title">Все пиццы</h2>
            <div className="content__items">

                {
                    !isLoading
                        ? pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />)
                        : [...new Array(6)].map((_, i) => <Preloader key={i} />)

                }
            </div></>
    )
}

export default Home