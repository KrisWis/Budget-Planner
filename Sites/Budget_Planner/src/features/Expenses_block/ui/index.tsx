import styles from './styles.module.scss';

export const Expenses_block: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.content_block}>
            <h3>Shopping</h3>

            <div className={styles.price_and_delete}>
                <p className={styles.price}>$60</p>

                <div className={styles.delete}>
                    <i className="fa fa-close" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}
