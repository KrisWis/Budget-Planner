import { Button } from '../../../entities';
import { AddExpense_search } from '../../../entities/Add_Expense_input/ui';
import styles from './styles.module.scss';

export const Add_Expense: React.FC = (): React.JSX.Element => {
    return (
        <>
            <h2 className={styles.caption}>Add Expense</h2>

            <div className={styles.forms}>
                <AddExpense_search title="Home" />
                <AddExpense_search title="Cost" />
            </div>

            <Button className={styles.save} title="Save" />
        </>
    )
}
