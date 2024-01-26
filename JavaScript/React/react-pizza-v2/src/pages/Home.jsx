import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import PizzaBlockSkeleton from '../components/PizzaBlock/Skeleton';

import { Pagination } from '../components/Pagination';

import { useSelector } from 'react-redux';


export const categories = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [pizzasIsLoading, setPizzasIsLoading] = React.useState(true);
    const [CurrentPage, setCurrentPage] = React.useState(1);

    const { categoryIndex, SortFilter, searchValue } = useSelector((state) => state.filter);

    React.useEffect(() => {
        setPizzasIsLoading(true);

        fetch(`https://65932afdbb12970719906e63.mockapi.io/items?page=${CurrentPage}&limit=4&${categoryIndex > 0 ? `category=${categoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}${searchValue ? `&search=${searchValue}` : ''}`).then(res => {

            return res.json();

        }).then(arr => {

            if (arr !== "Not found") {
                setPizzas(arr);
            }

            setPizzasIsLoading(false);

        })

        window.scrollTo(0, 0);

    }, [categoryIndex, SortFilter, searchValue, CurrentPage]);

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
            <Pagination onChangePage={(page) => setCurrentPage(page)} />
        </div>
    )
}
