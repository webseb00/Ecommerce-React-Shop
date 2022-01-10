import styles from './Features.module.css';
import { FaTruck } from "react-icons/fa";
import { FaMoneyBillAlt } from "react-icons/fa";
import { FaUndo } from "react-icons/fa";
import { BsLifePreserver } from "react-icons/bs";

const Features = () => {
  return (
    <section className={styles.features}>
      <div className={styles.features__container}>
        <div className={styles.features__item}>
          <h5 className={styles.features__title}>
            <FaTruck className={styles.features__icon} />
            Free Delivery
          </h5>
          <p>For orders over 100$</p>
        </div>
        <div className={styles.features__item}>
          <h5 className={styles.features__title}>
            <FaMoneyBillAlt className={styles.features__icon} />
            Refund Guarantee
          </h5>
          <p>You can send product back without any reason</p>
        </div>
        <div className={styles.features__item}>
          <h5 className={styles.features__title}>
            <FaUndo className={styles.features__icon} />
            Exchange Guarantee
          </h5>
          <p>14 days exchange for all products</p>
        </div>
        <div className={styles.features__item}>
          <h5 className={styles.features__title}>
            <BsLifePreserver className={styles.features__icon} />
            Friendly Support
          </h5>
          <p>Need help? Contact Us!</p>
        </div>
      </div>
    </section>
  )
};

export default Features;