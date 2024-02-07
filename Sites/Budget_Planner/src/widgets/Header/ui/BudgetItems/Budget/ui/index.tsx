import { Button } from '../../../../../../entities';
import styles from './styles.module.scss';
import React from 'react';

export const Budget: React.FC<BudgetProps> = ({ budget }): React.JSX.Element => {

    const [Budget, setBudget] = React.useState<number>(budget);

    const [EditVisible, setEditVisible] = React.useState(false);

    const EditInput = React.useRef<HTMLInputElement>(null);

    const CloseEdit = (event?: KeyboardEvent) => {
        if (event) {
            event.preventDefault();
            if (event.keyCode === 13 || !event.key) {
                setBudget(Number(EditInput.current!.value));
                setEditVisible(false);
                EditInput.current!.removeEventListener("keyup", CloseEdit);
            }
        }
    }

    const showEdit = (): void => {
        setEditVisible(true);

        setTimeout(() => {
            EditInput.current!.focus();
        }, 0);

        EditInput.current!.addEventListener("keyup", CloseEdit);
    }
    return (
        <div className={styles.budget}>
            <p>Budget: ${EditVisible ? '' : Budget}</p>
            <input ref={EditInput} type='number' className={EditVisible ? styles.edit : "hidden"} onChange={(e: React.ChangeEvent<HTMLInputElement>) => setBudget(Number(e.target.value))} value={Budget} />
            <Button onClick={!EditVisible ? showEdit : CloseEdit} title="Edit" />
        </div>
    )
}
