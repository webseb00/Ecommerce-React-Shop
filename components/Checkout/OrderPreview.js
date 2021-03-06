import { useCartState } from '../../context/cart';
import { BsX } from 'react-icons/bs';
import styles from './OrderPreview.module.css';
import Image from 'next/image';

const OrderPreview = () => {

  const state = useCartState();
  const { subtotal, shipping, discount, total, currency } = state;
  const calculateTotals = () => `${(subtotal.raw + shipping.price.raw).toFixed(2)} ${currency.code}`;

  return (
    <div className={styles.wrapper}>
      <ul className={styles.list}>
        {state.line_items.map((item, index) => (
        <li key={index} className={styles.list__item}>
          <div className={styles.list__thumbnail}>
            <Image 
              src={item.image.url} 
              width={80} 
              height={80} 
              objectFit="contain" 
            />
          </div>
          <div className={styles.list__description}>
            <p>{item.name}</p>
            <p><b>{item.price.formatted_with_code}</b></p>
          </div>
          <div className={styles.list__button}>
            <button type="button" className={styles.list__remove}>
              <BsX />
            </button>
          </div>
        </li>)
        )}
      </ul>
      <div className={styles.total}>
        <div className={styles.total__sub}>
          <p>Subtotal:</p>
          <p>{subtotal.formatted_with_code}</p>
        </div>
        {/* <div className={styles.total__sub}>
          <p>Discount:</p>
          <p>{discount.amount_saved?.formatted_with_code || '-'}</p>
        </div> */}
        {
          shipping && 
          <div className={styles.total__sub}>
            <p>Shipping:</p>
            <p>{shipping.price.formatted_with_code}</p>
          </div>
        }
        {
          shipping &&
          <div className={styles.total__main}>
            <p>Total:</p>
            <p>{calculateTotals()}</p>
          </div>
        }
      </div>
    </div>
  )
};

export default OrderPreview;