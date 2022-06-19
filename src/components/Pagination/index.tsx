import React, { memo } from "react";
import ReactPaginate from "react-paginate";

import styles from "./Pagination.module.scss";

type PaginationProps = {
  currentPage: number;
  onChangePage: (value: number) => void;
};

const Pagination: React.FC<PaginationProps> = memo(
  ({ currentPage, onChangePage }) => {
    return (
      <ReactPaginate
        className={styles.root}
        breakLabel="..."
        nextLabel=">"
        onPageChange={(e) => {
          onChangePage(e.selected + 1);
        }}
        pageRangeDisplayed={5}
        pageCount={3}
        previousLabel="<"
      />
    );
  }
);

export default Pagination;
