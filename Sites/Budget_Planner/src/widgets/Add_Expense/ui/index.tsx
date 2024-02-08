import { Button } from '../../../entities';
import { AddExpense_search } from '../../../entities/Add_Expense_input/ui';
import styles from './styles.module.scss';
import { addExpense } from '../../../entities';
import { useAppDispatch } from '../../../app/AppStore';
import React from 'react';

export const Add_Expense: React.FC = (): React.JSX.Element => {

    const dispatch = useAppDispatch();

    const titleInputRef = React.useRef<HTMLInputElement>();
    const priceInputRef = React.useRef<HTMLInputElement>();

    const SaveOnClick = (): void => {
        if (isNaN(Number(priceInputRef.current!.value))) {

            return;
        }
        dispatch(addExpense({ caption: titleInputRef.current!.value, price: priceInputRef.current!.value }));
        titleInputRef.current!.value = '';
        priceInputRef.current!.value = '';
    }

    return (
        <>
            <h2 className={styles.caption}>Add Expense</h2>

            <div className={styles.forms}>
                <AddExpense_search referrence={titleInputRef} title="Name" />
                <AddExpense_search referrence={priceInputRef} title="Cost" />
            </div>

            <Button onClick={SaveOnClick} className={styles.save} title="Save" />
        </>
    )
}
