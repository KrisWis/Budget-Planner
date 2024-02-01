import React from 'react';

import styles from './NotFoundBlock.module.scss';

export const NotFoundBlock: React.FC = (): React.JSX.Element => {
    return (
        <div className={styles.root}>Ничего не найдено</div>
    )
}
