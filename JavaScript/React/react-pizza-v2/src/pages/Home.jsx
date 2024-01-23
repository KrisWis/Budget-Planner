import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import PizzaBlockSkeleton from '../components/PizzaBlock/Skeleton';

export const categories = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [pizzasIsLoading, setPizzasIsLoading] = React.useState(true);
    const [CategoryIndex, setCategoryIndex] = React.useState(0);
    const [SortFilter, setSortFilter] = React.useState("rating");

    React.useEffect(() => {
        setPizzasIsLoading(true);

        fetch(`https://65932afdbb12970719906e63.mockapi.io/items?${CategoryIndex > 0 ? `category=${CategoryIndex}` : ''}&sortBy=${SortFilter}&order=${SortFilter === "title" ? "asc" : "desc"}`).then(res => {

            return res.json();

        }).then(arr => {

            setPizzas(arr);
            setPizzasIsLoading(false);

        })

        window.scrollTo(0, 0);

    }, [CategoryIndex, SortFilter])

    const SelectCategory = (CategoryIndex) => {
        setCategoryIndex(CategoryIndex);
    }

    const SelectSortFilter = (SortFilter) => {
        setSortFilter(SortFilter);
    }

    return (
        <div className='container'>
            <div className="content__top">
                <Categories SelectCategory={SelectCategory} />
                <Sort SelectSortFilter={SelectSortFilter} />
            </div>
            <h2 className="content__title">{categories[CategoryIndex]} пиццы</h2>
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
        </div>
    )
}
