import React from 'react';

import { useSelector } from 'react-redux';
import { setSortFiltering } from '../redux/slices/FilterSlice';
import { SortFilterInterface } from '../@types/assets';
import { RootState, useAppDispatch } from '../redux/store';

const sortFilters: SortFilterInterface[] = [
    { name: "популярности", sort: "rating" },
    { name: "цене", sort: "price" },
    { name: "алфавиту", sort: "title" },
]

const Sort: React.FC = (): React.JSX.Element => {
    const [isVisible, setOpen] = React.useState<boolean>(false);
    const sortFilter: string = useSelector((state: RootState) => state.filter.sortFilter.name);
    const [activeSortFilter, setActiveSortFilter] = React.useState<number>(0);

    const dispatch = useAppDispatch();

    const sortFiltersOnClick: (sortFilterName: string, index: number, sortProperty: string) => void = (sortFilterName, index, sortProperty) => {
        setOpen(false);
        setActiveSortFilter(index);
        dispatch(setSortFiltering({ name: sortFilterName, sort: sortProperty }));
    }

    const sortRef = React.useRef<HTMLDivElement>();
    const sortSpanRef = React.useRef<HTMLSpanElement>();

    React.useEffect(() => {
        const bodyClickFunc = (event: MouseEvent) => {

            if (event.target !== sortRef.current && event.target !== sortSpanRef.current) {
                setOpen(false);
            }
        }
        document.body.addEventListener("click", bodyClickFunc);

        return () => {
            document.body.removeEventListener("click", bodyClickFunc);
        }
    }, [])

    return (
        <div className="sort" ref={sortRef}>
            <div className="sort__label" onClick={() => setOpen(prev => !prev)}>
                <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path
                        d="M10 5C10 5.16927 9.93815 5.31576 9.81445 5.43945C9.69075 5.56315 9.54427 5.625 9.375 5.625H0.625C0.455729 5.625 0.309245 5.56315 0.185547 5.43945C0.061849 5.31576 0 5.16927 0 5C0 4.83073 0.061849 4.68424 0.185547 4.56055L4.56055 0.185547C4.68424 0.061849 4.83073 0 5 0C5.16927 0 5.31576 0.061849 5.43945 0.185547L9.81445 4.56055C9.93815 4.68424 10 4.83073 10 5Z"
                        fill="#2C2C2C"
                    />
                </svg>
                <b>Сортировка по:</b>
                <span ref={sortSpanRef}>{sortFilter}</span>
            </div>
            {isVisible &&
                <div className="sort__popup">
                    <ul>
                        {sortFilters.map((sortFilter, index) => (
                            <li key={index} className={activeSortFilter === index ? 'active' : ''} onClick={() => sortFiltersOnClick(sortFilter["name"], index, sortFilter["sort"])}>{sortFilter["name"]}</li>
                        ))}
                    </ul>
                </div>
            }
        </div>
    );
}

export default Sort;