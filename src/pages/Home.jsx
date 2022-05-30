
import React from 'react'

import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort from '../components/Sort';
import Preloader from '../components/PizzaBlock/Preloader';
import Pagination from '../components/Pagination';


const Home = ({ searchValue }) => {
    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)
    const [categoryId, setCategoryId] = React.useState(0);
    const [currentPage, setCurrentPage] = React.useState(1);
    const [sortType, setSortType] = React.useState({
        name: 'популярности (DESC)',
        sort: 'rating'
    });

    const category = categoryId > 0 ? `category=${categoryId}` : '';
    const sort = sortType.sort.replace('-', '');
    const order = sortType.sort.includes('-') ? 'asc' : 'desc';
    const search = searchValue ? `&search=${searchValue}` : '';

    const pizzasItems = pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />);
    const skeleton = [...new Array(4)].map((_, i) => <Preloader key={i} />)

    React.useEffect(() => {
        setLoading(true)
        fetch(`https://628e5bff368687f3e715b43f.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sort}&order=${order}${search}`)
            .then(response => response.json())
            .then(data => {
                setPizzas(data)
                setLoading(false)
            })
        window.scrollTo(0, 0)
    }, [categoryId, sortType, searchValue, currentPage])
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
                    !isLoading ? pizzasItems : skeleton

                }
            </div>
            <Pagination onChangePage={setCurrentPage}/>
        </>
    )
}

export default Home