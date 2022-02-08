import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCartState, useCartDispatch } from '../../context/cart';
import { commerce } from '../../lib/commerce';
import styles from './Checkout.module.css';
import Cart from './Cart';
import AddressForm from './AddressForm';
import Summary from './Summary';
import Wrapper from './Wrapper';
import StepProgressBar from '../StepProgressBar/StepProgressBar';

const Main = () => {

  const [orderProcessing, setOrderProcessing] = useState(false);
  const [lineItems, setLineItems] = useState({});
  const [formData, setFormData] = useState({});

  const router = useRouter();

  const { setCheckoutToken, refreshCart, setCart } = useCartDispatch();
  const state = useCartState();

  useEffect(() => {
    generateCheckoutToken();

    setLineItems({});
    let lineItems = {};

    state.line_items.forEach(item => {
      lineItems = {
        ...lineItems,
        [item.id]: {
          quantity: item.quantity
        }
      }
    });

    setLineItems(lineItems);
  }, []);

  const generateCheckoutToken = async () => {
    if(state.line_items.length) {
      try {
        const res = await commerce.checkout.generateToken(state.id, { type: 'cart' });
        setCheckoutToken(res);
      } catch(err) {
        console.log('Checkout token ID generation error');
      }
    }
  }

  const handleOrderProcessing = async payment => {
    let final = {};

    setOrderProcessing(true);

    final.line_items = lineItems;

    final.fulfillment = {
      shipping_method: formData.shippingOption.id 
    }

    final.customer = {
      firstname: formData.firstName,
      lastname: formData.lastname,
      email: formData.email
    }

    final.shipping = {
      name: `${formData.firstName} ${formData.lastName}`,
      street: formData.street,
      town_city: formData.city,
      county_state: formData.shippingStateProvince,
      postal_zip_code: formData.zipCode,
      country: formData.shippingCountry
    }

    final.billing = {
      name: `${formData.firstName} ${formData.lastName}`,
      street: formData.street,
      town_city: formData.city,
      county_state: formData.shippingStateProvince,
      postal_zip_code: formData.zipCode,
      country: formData.shippingCountry
    }

    final.payment = {
      gateway: 'test_gateway',
      card: {
        number: payment.cardNumber,
        expiry_month: payment.expiryMonth,
        expiry_year:  payment.expiryYear,
        cvc: payment.CVC,
        postal_zip_code: formData.zipCode
      }
    }

    try {
      const res = await commerce.checkout.capture(state.checkoutToken.id, final);
      setOrderProcessing(false);
      refreshCart();

      localStorage.setItem('receipt', JSON.stringify(res));
      router.push('/confirmation');
    } catch(err) {
      window.alert(err.data.error.message);
      setOrderProcessing(false);
    }   
  }
  
  const [counter, setCounter] = useState(0);
  const handleIncreaseCounter = () => setCounter(counter + 1);
  const handleDecreaseCounter = () => setCounter(counter - 1);

  const displayCurrentComponent = step => {
    switch(step) {
      case 1:
        return (state.checkoutToken && 
          <Wrapper>
            <AddressForm 
              handleStepBackward={handleDecreaseCounter} 
              handleStepForward={handleIncreaseCounter}
              checkoutTokenID={state.checkoutToken.id} 
              setFormData={setFormData}
              formData={formData} 
            />
          </Wrapper>);
      case 2:
        return (
          <Wrapper>
            <Summary 
              formData={formData}
              handleOrderProcessing={handleOrderProcessing} 
              handleStepBackward={handleDecreaseCounter}
              />
          </Wrapper>
        )
      default:
        return <Cart 
                handleStepForward={handleIncreaseCounter}
                />;
    }
  }

  return (
    <div className={styles.container}>
      {(!!state.total_items && <StepProgressBar currentComponent={counter} steps={[
        { label: 'Cart' }, { label: 'Form' }, { label: 'Payment' } ]} />)}
      {displayCurrentComponent(counter)}
    </div>
  )
};

export default Main;