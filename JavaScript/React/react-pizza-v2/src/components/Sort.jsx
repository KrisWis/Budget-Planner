import React from 'react';

import { useDispatch, useSelector } from 'react-redux';
import { setSortFiltering } from '../redux/slices/FilterSlice';

const sortFilters = [
    { name: "популярности", sort: "rating" },
    { name: "цене", sort: "price" },
    { name: "алфавиту", sort: "title" },
]

function Sort() {
    const [isVisible, setOpen] = React.useState(false);
    const sortFilter = useSelector((state) => state.filter.sortFilter.name);
    const [activeSortFilter, setActiveSortFilter] = React.useState(0);

    const dispatch = useDispatch();

    function sortFiltersOnClick(sortFilter, index, sortProperty) {
        setOpen(false);
        setActiveSortFilter(index);
        dispatch(setSortFiltering({ name: sortFilter, sort: sortProperty }));
    }

    return (
        <div className="sort">
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
                <span>{sortFilter}</span>
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