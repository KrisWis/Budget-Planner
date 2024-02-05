import { Expenses_search, Expenses_block } from '../../../features';
import styles from './styles.module.scss';

export const Expenses: React.FC = (): React.JSX.Element => {
    return (
        <>
            <h2 className={styles.caption}>Expenses</h2>
            <Expenses_search />

            <div className={styles.expenses_blocks}>
                <Expenses_block />
                <Expenses_block />
                <Expenses_block />
                <Expenses_block />
                <Expenses_block />
            </div>
        </>
    )
}
