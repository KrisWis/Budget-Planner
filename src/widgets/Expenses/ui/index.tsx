import { RootState, useAppDispatch } from '../../../app/AppStore';
import { Expenses_search, Expenses_block, Expense } from '../../../features';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';
import React from 'react';
import { setSpentSoFar } from '../../../entities/Budget/model/slice';

export const Expenses: React.FC = (): React.JSX.Element => {

    const dispatch = useAppDispatch();

    const expenses_array = useSelector((state: RootState) => state.expenses.expenses);

    const [searchValue, setSearchValue] = React.useState("");

    const spentSoFar = expenses_array.reduce((sum: number, item: Expense) => sum + Number(item.price), 0);

    React.useEffect(() => {
        dispatch(setSpentSoFar(spentSoFar));
    }, [spentSoFar])

    return (
        <>
            <h2 className={styles.caption}>Expenses</h2>
            <Expenses_search searchValue={searchValue} setSearchValue={setSearchValue} />

            <div className={styles.expenses_blocks}>
                {expenses_array.filter((item: Expense) => item.caption.includes(searchValue)).map((expense: Expense) => (
                    <Expenses_block key={expense.caption} caption={expense.caption} price={expense.price} />
                ))}
            </div>
        </>
    )
}
