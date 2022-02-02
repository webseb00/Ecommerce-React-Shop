import { useState, useEffect } from 'react';
import { commerce } from '../../lib/commerce';
import { useForm } from "react-hook-form";
import { BsArrowLeft, BsFillPersonFill, BsTruck } from 'react-icons/bs';
import styles from './Checkout.module.css';
import button from './Cart.module.css';
import OrderPreview from './OrderPreview';

const AddressForm = ({ handleStepBackward, handleStepForward, checkoutTokenID, setFormData, formData }) => {

  const [form, setForm] = useState({
    shippingStateProvince: '',
    shippingPostalZipCode: '',
    shippingCountry: '',
    shippingCountries: {},
    shippingSubdivisions: {},
    shippingOptions: [],
    shippingOption: ''
  });

  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    defaultValues: {
      firstName: formData.firstName || '',
      lastName: formData.lastName || '',
      email: formData.email || '',
      street: formData.street || '',
      zipCode: formData.zipCode || '',
      city: formData.city || ''
    }
  });

  const onSubmit = data => {
    if(data) {
      setFormData({ ...data, ...form });
      handleStepForward();
    }
  };

  useEffect(() => {
    fetchShippingCountries(checkoutTokenID);
  }, []);
  
  useEffect(() => {
    if(form.shippingCountry) fetchSubdivisions(form.shippingCountry);
  }, [form.shippingCountry]);
  
  useEffect(() => {
    if(form.shippingStateProvince) fetchShippingOptions(checkoutTokenID, form.shippingCountry, form.shippingStateProvince);
  }, [form.shippingStateProvince]);
  
  const fetchShippingCountries = async checkoutTokenId => {
    try { 
      const { countries } = await commerce.services.localeListShippingCountries(checkoutTokenId);
      setForm({ ...form, shippingCountries: countries, shippingCountry: Object.keys(countries)[0] });
    } catch(err) {
      console.log('An error occurred');
    }
  }
    
  const fetchSubdivisions = async countryCode => {
    try {
      const { subdivisions } = await commerce.services.localeListSubdivisions(countryCode);
      setForm({ ...form, shippingSubdivisions: subdivisions, shippingStateProvince: Object.keys(subdivisions)[0] });
    } catch(err) {
      console.log('An error occured');
    }
  }

  const fetchShippingOptions = async (checkoutTokenId, country, stateProvince = null) => {
    try { 
      const res = await commerce.checkout.getShippingOptions(checkoutTokenId, { 
        country: country,
        region: stateProvince
      });
      setForm({ ...form, shippingOptions: res, shippingOption: res[0] });
    } catch(err) {
      console.log('An error occured');
    }
  }

  const handleShippingOptions = e => setForm({ ...form, [e.target.name]: e.target.value });

  return (
    <form className={styles.form} onSubmit={handleSubmit(onSubmit)}>
      <div className={styles.form__container}>
        <div className={styles.form__group}>
          <div className={styles.heading}>
            <h3 className={styles.heading__title}>
              <BsFillPersonFill className={styles.heading__icon} />
              Personal Information
            </h3>
            <span className={styles.heading__line}></span>
          </div>
          <div className={styles.form__input_group}>
            <input 
              type="text" 
              {...register('firstName', { required: true, pattern: /^[a-zA-Z]+$/ })}
              className={`${styles.form__input} ${errors.firstName && styles.error}`} 
              placeholder="First name *" 
            />
          </div>
          <div className={styles.form__input_group}>
            <input 
              type="text" 
              {...register('lastName', { required: true, pattern: /^[a-zA-Z]+$/ })}
              className={`${styles.form__input} ${errors.lastName && styles.error}`} 
              placeholder="Last name *" 
            />
          </div>
          <div className={styles.form__input_group}>
            <input 
              type="email" 
              {...register('email', { required: true, pattern: /^[\w\d\.]+\@\w+\.\w{3}/ })}
              className={`${styles.form__input} ${errors.email && styles.error}`} 
              placeholder="Email *" 
            />
          </div>
          <div className={styles.form__input_group}>
            <input 
              type="text" 
              {...register('street', { required: true })} 
              className={`${styles.form__input} ${errors.street && styles.error}`} 
              placeholder="Street *" 
            />
          </div>
          <div className={styles.form__input_group}>
            <input 
              type="text" 
              {...register('zipCode', { required: true, pattern: /^[\d\-]+$/ })} 
              className={`${styles.form__input} ${errors.zipCode && styles.error}`} 
              placeholder="Postal/Zip-Code *" 
            />
          </div>
          <div className={styles.form__input_group}>
            <input 
              type="text" 
              {...register('city', { required: true, pattern: /^[a-zA-Z]+$/ })} 
              className={`${styles.form__input} ${errors.city && styles.error}`} 
              placeholder="City *" 
            />
          </div>
        </div>
        <div className={styles.form__group}>
          <div className={styles.heading}>
            <h3 className={styles.heading__title}>
              <BsTruck className={styles.heading__icon} />
              Shipping Information
              </h3>
            <span className={styles.heading__line}></span>
          </div>
          <div className={styles.form__input_group}>
            <select
              value={form.shippingCountry}
              name="shippingCountry"
              className={styles.form__select}
              onChange={handleShippingOptions}
            >
              <option disabled>Country</option>
              {
                Object.keys(form.shippingCountries).map((index) => {
                  return (
                    <option value={index} key={index}>
                      {form.shippingCountries[index]}
                    </option>
                  )
                })
              };
            </select>
          </div>
          <div className={styles.form__input_group}>
            <select 
              value={form.shippingStateProvince}
              name="shippingStateProvince"
              className={styles.form__select}
              onChange={handleShippingOptions}
            >
              <option disabled>Province</option>
              {
                Object.keys(form.shippingSubdivisions).map((index) => {
                  return (
                    <option value={index} key={index}>{form.shippingSubdivisions[index]}</option>
                  );
                })
              };
            </select>
          </div>
          <div className={styles.form__input_group}>
            <select
              value={form.shippingOption.id}
              name="shippingOption"
              className={styles.form__select}
              onChange={handleShippingOptions}
            >
              <option disabled>Select a shipping method</option>
              {
                form.shippingOptions.map((method, index) => {
                  return (
                    <option value={method.id} key={index}>
                      {`${method.description} - ${method.price.formatted_with_code}` }
                    </option>
                  );
                })
              };
            </select>
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
          Payment &amp; Summary 
        </button>
      </div>
    </form>
  )
};

export default AddressForm;