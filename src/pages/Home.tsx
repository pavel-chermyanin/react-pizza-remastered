import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import qs from "qs";

import Categories from "../components/Categories";
import PizzaBlock from "../components/PizzaBlock";
import Sort, { list } from "../components/Sort";
import Preloader from "../components/PizzaBlock/Preloader";
import Pagination from "../components/Pagination";
import {
  setCategoryId,
  setPageCount,
  setFilters,
  selectFilter,
  FilterSLiceState,
} from "../redux/slices/filterSlice";
import { fetchPizzas, SearchPizzaParams, selectPizza } from "../redux/slices/pizzasSlice";
import { useAppDispatch } from "../redux/store";

const Home: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const isSearch = React.useRef(false);
  const isMounted = React.useRef(false);

  const { categoryId, sort, currentPage, searchValue } =
    useSelector(selectFilter);
  const { items, status } = useSelector(selectPizza);

  const onChangeCategory = (idx: number) => {
    dispatch(setCategoryId(idx));
  };

  const onChangePage = React.useCallback((numberValue: number) => {
    dispatch(setPageCount(numberValue));
  }, []);

  const getPizzas = () => {
    const category = categoryId > 0 ? `&category=${categoryId}` : "";
    const sortType = sort.sortProperty.replace("-", "");
    const order = sort.sortProperty.includes("-") ? "asc" : "desc";
    const search = searchValue ? `&search=${searchValue}` : "";

    dispatch(
      fetchPizzas({
        category,
        sortType,
        order,
        search,
        currentPage: String(currentPage),
      })
    );
  };

  React.useEffect(() => {
    window.scrollTo(0, 0);

    if (!isSearch.current) {
      getPizzas();
    }

    isSearch.current = false;
  }, [categoryId, sort.sortProperty, searchValue, currentPage]);

  // не сработает при первом ренедере
  React.useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.sortProperty,
        categoryId,
        currentPage,
      });
      navigate(`?${queryString}`);
    }
    isMounted.current = true;
  }, [categoryId, sort.sortProperty, currentPage]);

  // если быд первый рендер, то проверяем URL параметры и сохраняем в редуксе
  React.useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(
        window.location.search.substring(1)
      ) as unknown as SearchPizzaParams;

      const sort = list.find((obj) => obj.sortProperty === params.sortType);

    
      dispatch(
        setFilters({
            searchValue: params.search,
            categoryId: Number(params.category),
            currentPage: Number(params.currentPage),
            sort: sort || list[0]
        })
      );
      isSearch.current = true;
    }
  }, []);

  const pizzasItems = items.map((obj: any, index: number) => (
    <PizzaBlock {...obj} key={index} />
  ));
  const skeleton = [...new Array(4)].map((_, i) => <Preloader key={i} />);

  return (
    <>
      <div className="content__top">
        <Categories onClickCategory={onChangeCategory} value={categoryId} />
        <Sort />
      </div>
      <h2 className="content__title">Все пиццы</h2>

      {status === "error" ? (
        <div className="content__error">
          <h2>Произошла ошибка 😕</h2>
          <p>
            К сожалению не удалось получить пиццы.
            <br />
            Попробуйте позже.
          </p>
        </div>
      ) : (
        <div className="content__items">
          {status === "loading" ? skeleton : pizzasItems}
        </div>
      )}
      <Pagination currentPage={currentPage} onChangePage={onChangePage} />
    </>
  );
};

export default Home;
