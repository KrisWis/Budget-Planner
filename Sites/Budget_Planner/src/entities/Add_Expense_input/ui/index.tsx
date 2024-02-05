import styles from './styles.module.scss';

export const AddExpense_search: React.FC<AddExpense_Search_Props> = ({ title }): React.JSX.Element => {
    return (

        <div className={styles.content}>

            <h3>{title}</h3>
            <input className={styles.input} />

        </div>
    )
}
