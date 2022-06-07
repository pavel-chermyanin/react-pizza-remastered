
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';


import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { list } from '../components/Sort';
import Preloader from '../components/PizzaBlock/Preloader';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';
import { fetchPizzas } from '../redux/slices/pizzasSlice';


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { categoryId, sort, currentPage } = useSelector(state => state.filter);
    const { items, status } = useSelector(state => state.pizzas);

    const { searchValue } = React.useContext(SearchContext)

    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setPageCount(number))
    }

    const getPizzas = () => {

        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sortType = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';


        dispatch(fetchPizzas({ category, sortType, order, search, currentPage }))

    }

    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            getPizzas()
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])

    // не сработает при первом ренедере
    React.useEffect(() => {
        if (isMounted.current) {
            const queryString = qs.stringify({
                sortProperty: sort.sortProperty,
                categoryId,
                currentPage
            })
            navigate(`?${queryString}`)
        }
        isMounted.current = true
    }, [categoryId, sort.sortProperty, currentPage])


    // если быд первый рендер, то проверяем URL параметры и сохраняем в редуксе
    React.useEffect(() => {
        if (window.location.search) {
            const params = qs.parse(window.location.search.substring(1))

            const sort = list.find(obj => obj.sortProperty === params.sortProperty)

            dispatch(
                setFilters({
                    ...params,
                    sort
                })
            )
            isSearch.current = true
        }

    }, [])





    const pizzasItems = items.map((obj, index) => <PizzaBlock key={index} {...obj} />);
    const skeleton = [...new Array(4)].map((_, i) => <Preloader key={i} />)

    return (
        <>
            <div className="content__top">
                <Categories
                    onClickCategory={onChangeCategory}
                    value={categoryId} />
                <Sort />

            </div>
            <h2 className="content__title">Все пиццы</h2>


            {
                status === 'error' ? (
                    <div className="content__error">
                        <h2>Произошла ошибка 😕</h2>
                        <p>
                            К сожалению не удалось получить пиццы.<br />
                            Попробуйте позже.
                        </p>
                    </div>
                ) : (
                    <div className="content__items">
                        {
                            status === 'loading' ? skeleton : pizzasItems
                        }
                    </div>
                )
            }
            <Pagination onChangePage={onChangePage} />
        </>
    )
}

export default Home