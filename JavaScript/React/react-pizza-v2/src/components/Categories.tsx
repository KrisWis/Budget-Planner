import React from 'react';
import { categories } from '../pages/Home';

import { useSelector } from 'react-redux';
import { setCategoryIndex } from '../redux/slices/FilterSlice';

import { RootState, useAppDispatch } from '../redux/store';

const Categories: React.FC = (): React.JSX.Element => {

    const categoryIndex = useSelector((state: RootState) => state.filter.categoryIndex);
    const dispatch = useAppDispatch();

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