import { BudgetItems } from './BudgetItems';
import styles from './styles.module.scss';

export const Header: React.FC = (): React.JSX.Element => {
    return (
        <>
            <h2 className={styles.caption}>My Budget Planner</h2>
            <BudgetItems />
        </>
    )
}
