import styles from './ProductItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { BsSearch } from "react-icons/bs";

const ProductItem = ({ image, title, price, permalink }) => {
  return (
    <div className={styles.item}>
      <Image 
        src={image} 
        width={300} 
        height={300} 
        objectFit="contain" 
      />
      <h4>{title}</h4>
      <span className={styles.item__price}>{price}</span>
      <Link href={`/bikes/${permalink}`}>
        <button 
          className={styles.item__button} 
          type="button"
          >
          <BsSearch className={styles.item__icon} />
          View product
        </button>
      </Link>
    </div>
  )
};

export default ProductItem;