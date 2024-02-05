import { Budget } from "./Budget";
import { Remaining } from "./Remaining";
import { SpentSoFar } from "./SpentSoFar";
import styles from './styles.module.scss';

export const BudgetItems: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.budget_items}>
            <Budget />
            <Remaining />
            <SpentSoFar />
        </div>
    )
}
