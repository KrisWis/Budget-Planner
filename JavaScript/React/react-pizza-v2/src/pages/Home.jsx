import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import PizzaBlockSkeleton from '../components/PizzaBlock/Skeleton';

import { Pagination } from '../components/Pagination';

import { useSelector, useDispatch } from 'react-redux';

import axios from 'axios';
import { setCurrentPage } from '../redux/slices/FilterSlice';


export const categories = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [pizzasIsLoading, setPizzasIsLoading] = React.useState(true);

    const { categoryIndex, SortFilter, searchValue, currentPage } = useSelector((state) => state.filter);
    const dispatch = useDispatch();

    React.useEffect(() => {
        setPizzasIsLoading(true);

        axios
            .get(
                `https://65932afdbb12970719906e63.mockapi.io/items?page=${currentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`
            ).then(res => {

                if (res.data !== "Not found") {
                    setPizzas(res.data);
                }

                setPizzasIsLoading(false);

            })

        window.scrollTo(0, 0);

    }, [categoryIndex, SortFilter, searchValue, currentPage]);

    const onChangePage = (number) => {
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
                    pizzasIsLoading
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
