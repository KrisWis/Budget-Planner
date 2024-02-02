import React from 'react';
import styles from './search.module.scss';
import { setSearchValue } from '../../redux/slices/FilterSlice';

import debounce from 'lodash.debounce';
import { ChangeEvent } from 'react';
import { useAppDispatch } from '../../redux/store';


export const Search = () => {
    const dispatch = useAppDispatch();
    const [search, setSearch] = React.useState<string>("");

    const onChangeInput = (e: ChangeEvent<HTMLInputElement>): void => {
        setSearch((e.target as HTMLInputElement).value);

        debounce(() => {
            dispatch(setSearchValue((e.target as HTMLInputElement).value));
        }, 550)();

    }

    return (
        <input className={styles.root} placeholder="Поиск пиццы.." value={search} onChange={onChangeInput} />
    )
}