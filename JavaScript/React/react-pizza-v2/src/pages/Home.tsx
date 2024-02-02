import React from 'react';

import Categories from '../components/Categories';
import Sort from '../components/Sort';
import { Pagination } from '../components/Pagination';
import { ContentItems } from '../components/ContentItems';


export const Home: React.FC = (): React.JSX.Element => {

    return (
        <div className='container'>
            <div className="content__top">
                <Categories />
                <Sort />
            </div>
            <ContentItems />
            <Pagination />
        </div>
    )
}
