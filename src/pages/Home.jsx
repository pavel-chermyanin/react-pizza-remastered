
import React from 'react'

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Preloader from '../components/PizzaBlock/Preloader';

const Home = () => {
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0);
    const [sortType, setSortType] = React.useState({
        name: 'популярности (DESC)',
        sort: 'rating'
    });

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'asc' : 'desc';

    React.useEffect(() => {
        setLoading(true)
        fetch(`https://628e5bff368687f3e715b43f.mockapi.io/pizzas?${category}&sortBy=${sort}&order=${order}`)
            .then(response => response.json())
            .then(data => {
                setPizzas(data)
                setLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType])
    return (
        <>
            <div className="content__top">
                <Categories
                    onClickCategory={setCategoryId}
                    value={categoryId} />
                <Sort
                    value={sortType}
                    setSortType={setSortType} />

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