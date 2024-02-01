import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';
import { OnPageChangePagination, PaginationInterface } from '../../@types/assets';

export const Pagination: React.FC<PaginationInterface> = ({ currentPage, onChangePage }): React.JSX.Element => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e: OnPageChangePagination) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}
