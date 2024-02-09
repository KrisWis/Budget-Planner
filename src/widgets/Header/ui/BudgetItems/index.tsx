import { Budget } from "./Budget/ui";
import { Remaining } from "./Remaining/ui";
import { SpentSoFar } from "./SpentSoFar/ui";
import styles from './styles.module.scss';
import { useSelector } from "react-redux";
import { RootState } from "../../../../app/AppStore";

export const BudgetItems: React.FC = (): React.JSX.Element => {

    const { budget, remaining, spentSoFar } = useSelector((state: RootState) => state.budget);

    return (
        <div className={styles.budget_items}>
            <Budget budget={budget} />
            <Remaining remaining={remaining} />
            <SpentSoFar spentSoFar={spentSoFar} />
        </div>
    )
}
