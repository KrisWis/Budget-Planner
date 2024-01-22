import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import PizzaBlock from '../components/PizzaBlock/index';
import PizzaBlockSkeleton from '../components/PizzaBlock/Skeleton';

export const Home = () => {
    const [pizzas, setPizzas] = React.useState([]);
    const [pizzasIsLoading, setPizzasIsLoading] = React.useState(true);

    React.useEffect(() => {

        fetch("https://65932afdbb12970719906e63.mockapi.io/items").then(res => {

            return res.json();

        }).then(arr => {

            setPizzas(arr);
            setPizzasIsLoading(false);

        })

        window.scrollTo(0, 0);

    }, [])

    return (
        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <h2 className="content__title">Все пиццы</h2>
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
