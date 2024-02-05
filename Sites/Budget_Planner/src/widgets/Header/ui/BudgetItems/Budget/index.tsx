import { Button } from '../../../../../entities';
import styles from './styles.module.scss';

export const Budget: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.budget}>
            <p>Budget: $2000</p>
            <Button title="Edit" />
        </div>
    )
}
