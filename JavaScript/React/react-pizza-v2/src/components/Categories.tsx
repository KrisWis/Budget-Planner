import React from 'react';
import { categories } from '../pages/Home';

import { useSelector, useDispatch } from 'react-redux';
import { setCategoryIndex } from '../redux/slices/FilterSlice';
import { FetchPizzasInterface } from '../@types/assets';

import { ThunkDispatch } from "@reduxjs/toolkit";

const Categories: React.FC = (): React.JSX.Element => {

    const categoryIndex = useSelector((state: { filter: FetchPizzasInterface }) => state.filter.categoryIndex);
    const dispatch = useDispatch<ThunkDispatch<any, any, any>>();

    const CategoryOnClick: (index: number) => void = (index) => {
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