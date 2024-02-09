import { ExpensesSearchProps } from '../model';
import styles from './styles.module.scss';
import React from 'react';

export const Expenses_search: React.FC<ExpensesSearchProps> = ({ searchValue, setSearchValue }): React.JSX.Element => {

    return (
        <input onChange={(e) => setSearchValue(e.target.value)} className={styles.search} value={searchValue} placeholder='Type to search...' />
    )
}
