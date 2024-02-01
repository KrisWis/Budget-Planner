import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import PizzaBlockSkeleton from '../components/PizzaBlock/Skeleton';
import { Pagination } from '../components/Pagination';
import { useSelector, useDispatch } from 'react-redux';
import { setCurrentPage, setFilters } from '../redux/slices/FilterSlice';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { FetchPizzasInterface, PizzasInterface } from '../@types/assets';
import { ThunkDispatch } from "@reduxjs/toolkit";


export const categories: string[] = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];


export const Home: React.FC = (): React.JSX.Element => {

    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();
    const navigate = useNavigate();

    const isMounted = React.useRef<boolean>(false);
    const isSearch = React.useRef<boolean>(false);

    React.useEffect(() => {

        if (window.location.search) {

            const params = qs.parse(window.location.search.substring(1));

            dispatch(setFilters({
                categoryIndex: Number(params.categoryIndex),
                currentPage: Number(params.currentPage),
                sortFilter: params.sortFilter,
                searchValue: params.searchValue
            }));

            isSearch.current = true;
        }
    }, [dispatch])

    const { categoryIndex, sortFilter, searchValue, currentPage } = useSelector((state: { filter: FetchPizzasInterface }) => state.filter);
    const { pizzas, status } = useSelector((state: { pizzas: PizzasInterface }) => state.pizzas);

    React.useEffect(() => {

        (async () => {
            if (!isSearch.current) {

                dispatch(fetchPizzas({ currentPage, categoryIndex, sortFilter, searchValue }));

                window.scrollTo(0, 0);
                if (isMounted.current) {

                    const queryString = qs.stringify({
                        sortFilter,
                        categoryIndex,
                        currentPage,
                        searchValue
                    });

                    navigate(`?${queryString}`);
                }
                isMounted.current = true;
            }

            isSearch.current = false;
        })();

    }, [categoryIndex, sortFilter, searchValue, currentPage, navigate, dispatch]);

    const onChangePage: (number: number) => void = (number) => {
        dispatch(setCurrentPage(number));
    }

    return (
        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">{categories[categoryIndex]} пиццы</h2>
            <div className="content__items">
                {
                    status === 'error' ? <div>Ошибка</div> :
                        status === 'loading'
                            ? [...new Array(6)].map((_, index) => <PizzaBlockSkeleton key={index} />)
                            : pizzas.map((pizza) => (
                                <PizzaBlock
                                    key={pizza["id"]}
                                    {...pizza}
                                />
                            ))
                }
            </div>
            <Pagination currentPage={currentPage} onChangePage={onChangePage} />
        </div>
    )
}
