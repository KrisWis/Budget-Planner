import { SpentSoFarProps } from '../model';
import styles from './styles.module.scss';

export const SpentSoFar: React.FC<SpentSoFarProps> = ({ spentSoFar }): React.JSX.Element => {
    return (
        <div className={styles.spentSoFar}>
            <p>Spent so far: ${spentSoFar}</p>
        </div>
    )
}
