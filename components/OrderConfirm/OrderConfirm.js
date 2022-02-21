import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import styles from './Confirmation.module.css';

const OrderConfirm = () => {

  const [customerReceipt, setCustomerReceipt] = useState(null);
  const router = useRouter();

  useEffect(() => {
    const receipt = JSON.parse(localStorage.getItem('receipt'));
    setCustomerReceipt(receipt);
  }, []);

  const removeReceipt = () => {
    localStorage.removeItem('receipt');
    router.push('/');
  };

  const renderConfirmation = () => (
    <div className={styles.container}>
      <div className={styles.order}>
        <div className={styles.order__header}>
          <h2 className={styles.order__title_h2}>
            Your order <span>{customerReceipt.customer_reference}</span> is being prepared!
          </h2>
          <p>Thanks for shopping at BikeShop - we sent an email to <span>{customerReceipt.customer.email}</span> with your receipt.
          Please check your spam if email has not arrived within 5 minutes.</p>
        </div>
        <div className={styles.order__body}>
          <ul className={styles.order__list}>
              {
                customerReceipt.order.line_items.map((item, index) => (
                  <li key={item.id} className={styles.order__item}>
                    <div>
                      <h5>{item.product_name}</h5>
                      <span>Quantity x {item.quantity}</span>
                    </div>
                    <div>
                      <p>{item.price.formatted_with_code}</p>
                    </div>
                  </li>
                ))
              }
          </ul>
          <div className={styles.order__shipping}>
            <p><b>Shipping:</b> {customerReceipt.order.shipping.price.formatted_with_code}</p>
          </div>
          <div className={styles.order__shipping}>
            <p><b>Discount:</b> {customerReceipt.order.discount.amount_saved?.formatted_with_code || '-'}</p>
          </div>
          <div className={styles.order__total}>
            <p><b>Total costs:</b> {customerReceipt.order.total.formatted_with_code}</p>
          </div>  
        </div>
        <div className={styles.order__footer}>
          <div className={styles.divider}>
            <span className={styles.divider__line}></span>
            <p className={styles.divider__title}>Shipping to</p>
            <span className={styles.divider__line}></span>
          </div>
          <div className={styles.order__segment}>
            {customerReceipt.shipping.name}<br/>
            {customerReceipt.shipping.town_city} {customerReceipt.shipping.postal_zip_code}<br/>
            {customerReceipt.shipping.street}, {customerReceipt.shipping.country}<br/>
          </div>     
        </div>
        <button 
          type="button" 
          onClick={removeReceipt}
          className={styles.order__button}
        >
          Shop Again
        </button>
      </div>
    </div>
  );

  return (customerReceipt && renderConfirmation());
}

export default OrderConfirm;