import { useMemo } from 'react';
import type { PaginationMeta } from '../../api/types/baseApiTypes';
import { Button } from '../Button';
import style from './Pagination.module.css';

interface PaginationProps extends PaginationMeta {
  onPageChange: (page: number) => void;
}

export const Pagination = (props: PaginationProps) => {
  const { total, max, skip, onPageChange } = props;
  const currentPage = Math.floor(skip / max) + 1;
  const totalPages = Math.ceil(total / max);

  const pages = useMemo(() => {
    const visiblePages: number[] = [];
    const maxVisible = 5;
    let start = Math.max(1, currentPage - Math.floor(maxVisible / 2));
    const end = Math.min(totalPages, start + maxVisible - 1);

    if (end - start < maxVisible - 1) {
      start = Math.max(1, end - maxVisible + 1);
    }

    for (let i = start; i <= end; i++) {
      visiblePages.push(i);
    }

    return visiblePages;
  }, [currentPage, totalPages]);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages && page !== currentPage) {
      onPageChange(page);
    }
  };

  if (totalPages <= 1) return null;
  return (
    <div className={style.pagination}>
      <Button
        variant="secondary"
        className={style.navButton}
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      >
        ‹
      </Button>

      {pages.map((page) => (
        <Button
          key={page}
          variant={page === currentPage ? 'tertiary' : 'secondary'}
          className={style.pageButton}
          onClick={() => goToPage(page)}
        >
          {page}
        </Button>
      ))}

      <Button
        variant="secondary"
        className={style.navButton}
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      >
        ›
      </Button>
    </div>
  );
};
