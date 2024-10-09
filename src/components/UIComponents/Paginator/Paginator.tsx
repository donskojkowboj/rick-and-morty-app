import Link from 'next/link';

import styles from './Paginator.module.scss';
import { createDynamicQueryString } from '@/api/helpers/createDynamicQueryString';

interface AdditionalQueries {
  name?: string;
  status?: string;
  gender?: string;
}

interface PaginatorProps {
  sourceUrl: string;
  activePage?: string;
  pagesCount: number;
  pagesToShow?: number;
  additionalQueries?: AdditionalQueries;
}

export const Paginator = ({
  sourceUrl,
  activePage = '1',
  pagesCount,
  pagesToShow = 3,
  additionalQueries,
}: PaginatorProps) => {
  const pageNumber = Number(activePage);

  const halfPagesToShow = Math.floor(pagesToShow / 2);
  let startPage = Math.max(1, pageNumber - halfPagesToShow);
  let endPage = Math.min(pagesCount, pageNumber + halfPagesToShow);

  if (endPage - startPage < pagesToShow - 1) {
    endPage = Math.min(pagesCount, startPage + pagesToShow - 1);
    startPage = Math.max(1, endPage - pagesToShow + 1);
  }

  const createNextBtnStyles = () => {
    if (pageNumber === pagesCount) {
      return `${styles.paginator__btn} ${styles.paginator__disabled}`;
    }
    return `${styles.paginator__btn}`;
  };

  const createPrevBtnStyles = () => {
    if (pageNumber == 1) {
      return `${styles.paginator__btn} ${styles.paginator__disabled}`;
    }
    return `${styles.paginator__btn}`;
  };

  const displayPages = () => {
    const pages = [];
    for (let i = startPage; i <= endPage; i++) {
      pages.push(i);
    }
    return pages;
  };

  const createLinkClassname = (page: number) => {
    return page == pageNumber
      ? `${styles.paginator__pageLink} ${styles.paginator__active}`
      : styles.paginator__pageLink;
  };

  const turnPages = (pageChange: number) => {
    return `${sourceUrl}${createDynamicQueryString(pageChange, additionalQueries?.name, additionalQueries?.status, additionalQueries?.gender)}`;
  };

  return (
    <div className={styles.paginator}>
      <Link href={turnPages(pageNumber - 1)} className={createPrevBtnStyles()}>
        Prev
      </Link>

      {startPage > 1 && (
        <>
          <Link className={styles.paginator__pageLink} href={turnPages(1)}>
            {1}
          </Link>
          {startPage > 2 && <span>...</span>}
        </>
      )}

      {displayPages().map((page) => (
        <Link className={createLinkClassname(page)} key={page} href={turnPages(page)}>
          {page}
        </Link>
      ))}

      {endPage < pagesCount && (
        <>
          {endPage < pagesCount - 1 && <span>...</span>}
          <Link className={styles.paginator__pageLink} href={turnPages(pagesCount)}>
            {pagesCount}
          </Link>
        </>
      )}

      <Link href={turnPages(pageNumber + 1)} className={createNextBtnStyles()}>
        Next
      </Link>
    </div>
  );
};
