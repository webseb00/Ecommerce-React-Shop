import { useForm } from "react-hook-form";
import styles from './Checkout.module.css';
import button from './Cart.module.css';
import { BsArrowLeft, BsPaypal } from 'react-icons/bs';

const Summary = ({ formData, handleOrderProcessing, handleStepBackward }) => {

  const { register, handleSubmit, watch, formState: { errors } } = useForm();
  const { firstName, lastName, email, street, zipCode, city, shippingCountries, shippingCountry, shippingSubdivisions, shippingStateProvince, shippingOptions, shippingOption } = formData;

  const getFullName = (arr, item) => {
    let getValue = '';
    if(arr) {
      Object.keys(arr).forEach(key => {
        if(key === item) getValue = arr[key];
      });
    }

    return getValue;
  }

  const countryFullName = getFullName(shippingCountries, shippingCountry);
  const provinceFullName = getFullName(shippingSubdivisions, shippingStateProvince);

  const getShippingOption = shippingOptions.filter(item => item.id === shippingOption);

  const onSubmit = data => handleOrderProcessing(data);
  
  return (
    <>
      <div className={styles.summary}>
        <div className={styles.summary__item}>
          <div className={styles.heading}>
            <h3 className={styles.heading__title}>
              Personal Information
            </h3>
            <span className={styles.heading__line}></span>
          </div>
          <div className={styles.summary__box}>
            <span>Full Name</span>
            <p>{firstName} {lastName}</p>
          </div>
          <div className={styles.summary__box}>
            <span>Email address</span>
            <p>{email}</p>
          </div>
          <div className={styles.summary__box}>
            <span>Shipping Address</span>
            <p>{street},<br />
            {city} {zipCode},<br />
            {provinceFullName},<br />
            {countryFullName}
            </p>
          </div>
          <div className={styles.summary__box}>
            <span>Shipping Method</span>
            <p>{getShippingOption[0].description} - {getShippingOption[0].price.formatted_with_code}</p>
          </div>
        </div>
        <div className={styles.summary__item}>
          <div className={styles.heading}>
            <h3 className={styles.heading__title}>
              <BsPaypal className={styles.heading__icon} />
              Payment Details
            </h3>
            <span className={styles.heading__line}></span>
          </div>
          <form>
            <div className={styles.form__input_group}>
              <input 
                type="number" 
                {...register('cardNumber', { required: true, pattern: /^[0-9]{16}$/ })}
                className={`${styles.form__input} ${errors.cardNumber && styles.error}`} 
                placeholder="Credit Card Number" 
              />
              <input 
                type="number" 
                max="999"
                {...register('CVC', { required: true, pattern: /^[0-9]{3}$/ })}
                className={`${styles.form__input} ${errors.CVC && styles.error}`} 
                placeholder="CVC"
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
              <input 
                type="number" 
                min="1"
                max="12"
                {...register('expiryMonth', { required: true, pattern: /^[0-9]{1,2}$/ })}
                className={`${styles.form__input} ${errors.expiryMonth && styles.error}`} 
                placeholder="Expiry Month" 
              />
            </div>
          </form>
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
          onClick={() => handleSubmit(onSubmit)()}
        >
          Confirm Order
        </button>
      </div>
    </>
  )
}

export default Summary;