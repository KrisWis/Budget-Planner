import React from 'react';
import styles from './search.module.scss';
import AppContext from '../../context/context';


export const Search = () => {
    const { searchValue, setSearchValue } = React.useContext(AppContext);

    return (
        <input className={styles.root} placeholder="Поиск пиццы.." value={searchValue} onChange={(event) => setSearchValue(event.target.value)} />
    )
}
