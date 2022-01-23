import styles from './ProductItem.module.css';
import Image from 'next/image';
import Link from 'next/link';
import { FaCartPlus } from "react-icons/fa";

const ProductItem = ({ image, title, price, permalink }) => {
  return (
    <div className={styles.item}>
      <Link href={`/bikes/${permalink}`}>
        <a>
          <Image 
            src={image} 
            width={300} 
            height={300} 
            objectFit="contain" 
          />
          <h4>{title}</h4>
          <span className={styles.item__price}>{price}</span>
        </a>
      </Link>
      <button 
        className={styles.item__button} 
        type="button"
      >
        <FaCartPlus className={styles.item__icon} />
        Add To Cart
      </button>
    </div>
  )
};

export default ProductItem;