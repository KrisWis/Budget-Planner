import { Expense } from '../model';
import styles from './styles.module.scss';
import { useAppDispatch } from '../../../app/AppStore';
import { removeExpense } from '../../../entities';

export const Expenses_block: React.FC<Expense> = ({ caption, price }): React.JSX.Element => {

    const dispatch = useAppDispatch();

    return (
        <div className={styles.content_block}>
            <h3>{caption}</h3>

            <div className={styles.price_and_delete}>
                <p className={styles.price}>${price}</p>

                <div className={styles.delete} onClick={() => dispatch(removeExpense({ caption, price }))}>
                    <i className="fa fa-close" aria-hidden="true"></i>
                </div>
            </div>
        </div>
    )
}
