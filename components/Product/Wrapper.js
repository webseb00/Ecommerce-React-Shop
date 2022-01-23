import { useState } from 'react';
import SideNav from './SideNav/SideNav';
import ProductItem from './ProductItem/ProductItem';
import Pagination from '../Pagination/Pagination';
import styles from './Wrapper.module.css';

const Wrapper = ({ items }) => {
  const totalPageItems = 6;
  const totalPages = Math.ceil(items.length/totalPageItems);
  const pagesArray = Array.from({ length: totalPages }, (v, k) => k + 1);
  const [currentPage, setCurrentPage] = useState(1);

  const paginateProducts = items.slice((currentPage - 1) * totalPageItems, currentPage * totalPageItems);

  const pagination = () => {
    if(totalPageItems > items.length) {
      return '';
    } else {
      return (
        <Pagination 
          totalPages={pagesArray}
          setCurrentPage={setCurrentPage}
          currentPage={currentPage}
        />
      )
    }
  }

  return (
    <div className={styles.wrapper}>
      <SideNav />
      <div className={styles.container}>
        <div className={styles.container__items}>
          {paginateProducts.map((item, index) => (
            <ProductItem 
              key={index} 
              id={item.id}
              image={item.image.url} 
              title={item.name}
              price={item.price.formatted_with_code}
              permalink={item.permalink}
            />
          ))}
        </div>
        {pagination()}
      </div>
    </div>
  )
};

export default Wrapper;