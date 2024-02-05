import styles from './styles.module.scss';

export const SpentSoFar: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.spentSoFar}>
            <p>Spent so far: $960</p>
        </div>
    )
}
