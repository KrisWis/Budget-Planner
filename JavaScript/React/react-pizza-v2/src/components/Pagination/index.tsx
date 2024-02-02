import React from 'react';
import ReactPaginate from 'react-paginate';
import styles from './pagination.module.scss';
import { OnPageChangePagination } from '../../@types/assets';
import { useSelector } from 'react-redux';
import { setCurrentPage } from '../../redux/slices/FilterSlice';
import { RootState, useAppDispatch } from '../../redux/store';

export const Pagination: React.FC = (): React.JSX.Element => {
    const dispatch = useAppDispatch();

    const currentPage = useSelector((state: RootState) => state.filter.currentPage);

    const onChangePage: (number: number) => void = (number) => {
        dispatch(setCurrentPage(number));
    }

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
