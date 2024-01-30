import React from 'react';
import { categories } from '../pages/Home';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../redux/slices/FilterSlice';

function Categories() {

    const categoryIndex = useSelector((state) => state.filter.categoryIndex);
    const dispatch = useDispatch();

    const CategoryOnClick = (index) => {
        dispatch(setCategoryIndex(index));
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => CategoryOnClick(index)} className={categoryIndex === index ? 'active' : ''}>{category}</li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;