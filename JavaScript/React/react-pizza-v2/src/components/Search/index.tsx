import React from 'react';
import styles from './search.module.scss';
import { useDispatch } from 'react-redux';
import { setSearchValue } from '../../redux/slices/FilterSlice';

import debounce from 'lodash.debounce';

export const Search = () => {
    const dispatch = useDispatch();
    const [search, setSearch] = React.useState("");

    const searchDebounce = React.useCallback((e) => debounce(() => {
        dispatch(setSearchValue(e.target.value));
        setSearch(e.target.value);
    }, 1000), [dispatch])

    const onChangeInput = (e) => {
        setSearch(e.target.value);
        searchDebounce(e);
    }

    return (
        <input className={styles.root} placeholder="Поиск пиццы.." value={search} onChange={(e) => onChangeInput(e)} />
    )
}


/* ТИПИЗАЦИЯ ONCLICK, ONCHANGE И EVENT (TYPESCRIPT) - https://www.youtube.com/watch?v=WbrxEPgS83c&list=PL0FGkDGJQjJG9eI85xM1_iLIf6BcEdaNl&index=24 */


