import styles from './styles.module.scss';
import { AddExpense_Search_Props } from '../model';

export const AddExpense_search: React.FC<AddExpense_Search_Props> = ({ referrence, title }): React.JSX.Element => {
    return (

        <div className={styles.content}>

            <h3>{title}</h3>
            <input ref={referrence} className={styles.input} />
            <p className={`${styles.error}`}>В поле должно быть число!</p>

        </div>
    )
}
