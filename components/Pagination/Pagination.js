import { BsCaretLeft, BsCaretRight } from 'react-icons/bs';
import styles from './Pagination.module.css';

const Pagination = ({ totalPages, setCurrentPage, currentPage }) => {

  const handlePrevious = e => {
    e.preventDefault();
    if(currentPage === 1) return;
    else { setCurrentPage(currentPage - 1); }
  }

  const handleNext = e => {
    e.preventDefault();
    if(currentPage >= totalPages.length) return;
    else { setCurrentPage(currentPage + 1); }
  }

  const handlePagination = e => {
    e.preventDefault();
    const number = e.currentTarget.dataset.number;
    setCurrentPage(Number(number));
  }

  return (
    <ul className={styles.pagination}>
      <li className={styles.pagination__previous}>
        <a className={`${styles.pagination__link} ${currentPage === 1 && styles.pagination__link_disabled}`} 
          href="#" 
          onClick={handlePrevious}
        >
          <BsCaretLeft />
        </a>
      </li>
      {
        Array.from(totalPages).map((el, index) => (
          <li key={index}>
            <a className={`${styles.pagination__link} ${currentPage === el && styles.pagination__link_active}`} 
              href="#" 
              onClick={handlePagination} 
              data-number={el}
            >
              {el}
            </a>
          </li>
        ))
      }
      <li className={styles.pagination__next}>
        <a className={`${styles.pagination__link} ${currentPage >= totalPages.length && styles.pagination__link_disabled}`} 
          href="#" 
          onClick={handleNext}
        >
          <BsCaretRight />
        </a>
      </li>
    </ul>
  )
}

export default Pagination;