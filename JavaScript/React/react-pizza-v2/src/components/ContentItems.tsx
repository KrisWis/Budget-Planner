import React from 'react';
import PizzaBlock from '../components/PizzaBlock/index';
import PizzaBlockSkeleton from '../components/PizzaBlock/Skeleton';
import { useSelector } from 'react-redux';
import { setFilters } from '../redux/slices/FilterSlice';
import { useNavigate } from 'react-router-dom';
import qs from 'qs';
import { fetchPizzas } from '../redux/slices/pizzasSlice';
import { RootState, useAppDispatch } from '../redux/store';


export const categories: string[] = ["Все", "Мясные", "Вегетарианские", "Гриль", "Острые", "Закрытые"];

export const ContentItems: React.FC = (): React.JSX.Element => {

    const dispatch = useAppDispatch();
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

    const { categoryIndex, sortFilter, searchValue, currentPage } = useSelector((state: RootState) => state.filter);
    const { pizzas, status } = useSelector((state: RootState) => state.pizzas);

    React.useEffect(() => {

        (async () => {
            if (!isSearch.current) {

                dispatch(fetchPizzas({ currentPage, categoryIndex, sortFilter, searchValue }));

                window.scrollTo(0, 0);
                if (isMounted.current) {

                    // const queryString = qs.stringify({
                    //     sortFilter,
                    //     categoryIndex,
                    //     currentPage,
                    //     searchValue
                    // });

                    // navigate(`?${queryString}`);
                }
                isMounted.current = true;
            }

            isSearch.current = false;
        })();

    }, [categoryIndex, sortFilter, searchValue, currentPage, navigate, dispatch]);

    return (
        <>
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
        </>
    )
}