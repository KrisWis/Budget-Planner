import { RemainingProps } from '../model';
import styles from './styles.module.scss';

export const Remaining: React.FC<RemainingProps> = ({ remaining }): React.JSX.Element => {
    return (
        <div className={styles.remaining}>
            <p>Remaining: ${remaining}</p>
        </div>
    )
}
