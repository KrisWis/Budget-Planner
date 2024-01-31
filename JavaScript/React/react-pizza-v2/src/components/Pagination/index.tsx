import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';
import { PaginationInterface } from '../../@types/assets';

export const Pagination: React.FC<PaginationInterface> = ({ currentPage, onChangePage }) => {
    return (
        <ReactPaginate
            className={styles.root}
            breakLabel="..."
            nextLabel=">"
            onPageChange={(e) => onChangePage(e.selected + 1)}
            pageRangeDisplayed={4}
            pageCount={3}
            forcePage={currentPage - 1}
            previousLabel="<"
            renderOnZeroPageCount={null}
        />
    )
}
