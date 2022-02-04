import { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { useCartState, useCartDispatch } from '../../context/cart';
import Cart from './Cart';
import AddressForm from './AddressForm';
import Summary from './Summary';
import styles from './Checkout.module.css';
import { commerce } from '../../lib/commerce';
import Wrapper from './Wrapper';

const Main = () => {

  const [orderProcessing, setOrderProcessing] = useState(false);
  const [lineItems, setLineItems] = useState({});
  const [formData, setFormData] = useState({});

  const router = useRouter();

  const { setCheckoutToken, refreshCart } = useCartDispatch();
  const state = useCartState();

  useEffect(() => {
    generateCheckoutToken();

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

  const shippingCost = formData.shippingOptions ? formData.shippingOptions.filter(item => item.id === formData.shippingOption) : '';
  
  const [counter, setCounter] = useState(0);
  const handleIncreaseCounter = () => setCounter(counter + 1);
  const handleDecreaseCounter = () => setCounter(counter - 1);

  const displayCurrentComponent = step => {
    switch(step) {
      case 1:
        return (state.checkoutToken && 
          <Wrapper
            shippingCost={shippingCost}
          >
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
          <Wrapper
            shippingCost={shippingCost}
          >
            <Summary 
              formData={formData}
              setData={setFormData} 
              handleOrderProcessing={handleOrderProcessing} 
              handleStepBackward={handleDecreaseCounter}
              />
          </Wrapper>
        )
      default:
        return <Cart handleStepForward={handleIncreaseCounter} />;
    }
  }

  return (
    <div className={styles.container}>
      {displayCurrentComponent(counter)}
    </div>
  )
};

export default Main;