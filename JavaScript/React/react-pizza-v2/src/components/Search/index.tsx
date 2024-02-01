import React from 'react';
import styles from './search.module.scss';
import { setSearchValue } from '../../redux/slices/FilterSlice';

import debounce from 'lodash.debounce';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../redux/store';


export const Search = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = React.useState<string>("");

    const searchDebounce = React.useCallback((e: ChangeEvent<HTMLInputElement>): void => debounce(() => {

        dispatch(setSearchValue((e.target as HTMLInputElement).value));
        setSearch((e.target as HTMLInputElement).value);

    }, 1000), [dispatch])

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch((e.target as HTMLInputElement).value);
        searchDebounce(e);
    }

    return (
        <input className={styles.root} placeholder="Поиск пиццы.." value={search} onChange={(e: ChangeEvent<HTMLInputElement>) => onChangeInput(e)} />
    )
}