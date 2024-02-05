import styles from './styles.module.scss';

export const Expenses_search: React.FC = (): React.JSX.Element => {
    return (
        <input className={styles.search} placeholder='Type to search...' />
    )
}
