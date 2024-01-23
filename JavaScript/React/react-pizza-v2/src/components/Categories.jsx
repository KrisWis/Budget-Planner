import React from 'react';
import { categories } from '../pages/Home';

function Categories(props) {

    const [activeIndex, setActiveIndex] = React.useState(0);

    const CategoryOnClick = (index) => {
        setActiveIndex(index);
        props.SelectCategory(index);
    }

    return (
        <div className="categories">
            <ul>
                {categories.map((category, index) => (
                    <li key={index} onClick={() => CategoryOnClick(index)} className={activeIndex === index ? 'active' : ''}>{category}</li>
                ))}
            </ul>
        </div>
    );
}

export default Categories;