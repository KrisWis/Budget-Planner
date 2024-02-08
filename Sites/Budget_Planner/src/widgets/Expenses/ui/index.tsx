import { RootState } from '../../../app/AppStore';
import { Expenses_search, Expenses_block, Expense } from '../../../features';
import styles from './styles.module.scss';
import { useSelector } from 'react-redux';

export const Expenses: React.FC = (): React.JSX.Element => {

    const expenses_array = useSelector((state: RootState) => state.expenses.expenses);

    return (
        <>
            <h2 className={styles.caption}>Expenses</h2>
            <Expenses_search />

            <div className={styles.expenses_blocks}>
                {expenses_array.map((expense: Expense) => (
                    <Expenses_block key={expense.caption} caption={expense.caption} price={expense.price} />
                ))}
            </div>
        </>
    )
}
