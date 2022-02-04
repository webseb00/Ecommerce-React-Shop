import OrderPreview from "./OrderPreview";
import styles from './Wrapper.module.css';

const Wrapper = ({ children, shippingCost }) => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.col_1}>
        {children}
      </div>
      <div className={styles.col_2}>
        <OrderPreview shippingCost={shippingCost} />
      </div>
    </div>
  )
}

export default Wrapper;