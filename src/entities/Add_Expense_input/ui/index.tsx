import styles from './styles.module.scss';
import { AddExpense_Search_Props } from '../model';
import React from 'react';

export const AddExpense_search: React.FC<AddExpense_Search_Props> = ({ referrence, title, error }): React.JSX.Element => {

    const [errorText, setErrorText] = React.useState("hidden");

    React.useEffect(() => {
        if (error) {
            setErrorText("");

            setTimeout(() => {
                setErrorText("hidden");
            }, 3000);
        }
    }, [error])

    return (

        <div className={styles.content}>

            <h3>{title}</h3>
            <input ref={referrence} className={styles.input} />
            <p className={`${styles.error} ${errorText}`}>В поле должно быть число!</p>

        </div>
    )
}
