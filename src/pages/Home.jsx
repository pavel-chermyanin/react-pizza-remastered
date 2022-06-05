
import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';


import Categories from '../components/Categories';
import PizzaBlock from '../components/PizzaBlock';
import Sort, { list } from '../components/Sort';
import Preloader from '../components/PizzaBlock/Preloader';
import Pagination from '../components/Pagination';
import { SearchContext } from '../App';
import { setCategoryId, setPageCount, setFilters } from '../redux/slices/filterSlice';


const Home = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const isSearch = React.useRef(false)
    const isMounted = React.useRef(false)

    const { categoryId, sort, currentPage } = useSelector(state => state.filter);

    const { searchValue } = React.useContext(SearchContext)

    const [pizzas, setPizzas] = React.useState([])
    const [isLoading, setLoading] = React.useState(true)



    const onChangeCategory = (id) => {
        dispatch(setCategoryId(id))
    }

    const onChangePage = (number) => {
        dispatch(setPageCount(number))
    }

    const fecthPizzas = () => {
        setLoading(true)

        const category = categoryId > 0 ? `&category=${categoryId}` : '';
        const sortType = sort.sortProperty.replace('-', '');
        const order = sort.sortProperty.includes('-') ? 'asc' : 'desc';
        const search = searchValue ? `&search=${searchValue}` : '';

        axios.get(`https://628e5bff368687f3e715b43f.mockapi.io/pizzas?page=${currentPage}&limit=4${category}&sortBy=${sortType}&order=${order}${search}`)
            .then(res => {
                setPizzas(res.data)
                setLoading(false)
            })
    }


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


    React.useEffect(() => {
        window.scrollTo(0, 0)

        if (!isSearch.current) {
            fecthPizzas()
        }

        isSearch.current = false
    }, [categoryId, sort.sortProperty, searchValue, currentPage])




    const pizzasItems = pizzas.map((obj, index) => <PizzaBlock key={index} {...obj} />);
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
            <div className="content__items">

                {
                    !isLoading ? pizzasItems : skeleton

                }
            </div>
            <Pagination onChangePage={onChangePage} />
        </>
    )
}

export default Home