import { useForm } from "react-hook-form";
import styles from './Checkout.module.css';
import button from './Cart.module.css';
import { BsArrowLeft, BsPaypal } from 'react-icons/bs';

const Summary = ({ data, handleOrderProcessing, handleStepBackward }) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();

  let shippingCountryFullName = '';
  let shippingProvinceFullName = '';
  let shippingOptionFullName = '';

  const { firstName, lastName, email, street, zipCode, city, shippingCountries, shippingCountry, shippingSubdivisions, shippingStateProvince, shippingOptions, shippingOption } = data;

  Object.keys(shippingCountries).forEach(key =>  {
    if(key === shippingCountry) {
      shippingCountryFullName = shippingCountries[key];
    }
  });

  Object.keys(shippingSubdivisions).forEach(key => {
    if(key === shippingStateProvince) {
      shippingProvinceFullName = shippingSubdivisions[key];
    }
  });

  const option = shippingOptions.filter(option => option.id === shippingOption);

  
  return (
    <>
      <div className={styles.summary}>
        <div>
          <div className={styles.form__group}>
            <div className={styles.heading}>
              <h3 className={styles.heading__title}>
                <BsPaypal className={styles.heading__icon} />
                Payment Information
              </h3>
              <span className={styles.heading__line}></span>
            </div>
            <div className={styles.form__input_group}>
              <input 
                type="number" 
                {...register('cardNumber', { required: true, pattern: /^[0-9]{16}$/ })}
                className={`${styles.form__input} ${errors.cardNumber && styles.error}`} 
                placeholder="Credit Card Number" 
              />
            </div>
            <div className={styles.form__input_group}>
              <input 
                type="number" 
                min="2022"
                {...register('expiryYear', { required: true, pattern: /^[0-9]{4}$/ })}
                className={`${styles.form__input} ${errors.expiryYear && styles.error}`} 
                placeholder="Expiry Year" 
              />
            </div>
            <div className={styles.form__input_group}>
              <input 
                type="number" 
                min="1"
                max="12"
                {...register('expiryMonth', { required: true, pattern: /^[0-9]{1,2}$/ })}
                className={`${styles.form__input} ${errors.expiryMonth && styles.error}`} 
                placeholder="Expiry Month" 
              />
            </div>
            <div className={styles.form__input_group}>
              <input 
                type="number" 
                max="999"
                {...register('CVC', { required: true, pattern: /^[0-9]{3}$/ })}
                className={`${styles.form__input} ${errors.CVC && styles.error}`} 
                placeholder="CVC"
              />
            </div>
          </div>  
        </div> 
      </div>
      <div className={styles.form__control}>
        <button 
          type="button" 
          className={`${button.button__cta} ${button.button__cta_back} ${button.mr_5}`} 
          onClick={handleStepBackward}
        >
          <BsArrowLeft />
          Go Back
        </button>
        <button 
          type="submit" 
          className={`${button.button__cta} ${button.button__cta_continue}`}
        >
          Confirm Order
        </button>
      </div>
    </>
  )
}

export default Summary;