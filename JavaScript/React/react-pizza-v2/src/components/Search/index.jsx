import React from 'react';
import styles from './search.module.scss';
import { useSelector, useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/FilterSlice';


export const Search = () => {
    const searchValue = useSelector((state) => state.filter.searchValue);
    const dispatch = useDispatch();

    return (
        <input className={styles.root} placeholder="Поиск пиццы.." value={searchValue} onChange={(event) => dispatch(setSearchValue(event.target.value))} />
    )
}
