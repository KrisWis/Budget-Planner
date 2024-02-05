import styles from './styles.module.scss';

export const Remaining: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.remaining}>
            <p>Remaining: $1040</p>
        </div>
    )
}
