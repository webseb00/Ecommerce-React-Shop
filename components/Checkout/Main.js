import { useState, useEffect } from 'react';
import { useCartState, useCartDispatch } from '../../context/cart';
import Cart from './Cart';
import AddressForm from './AddressForm';
import Summary from './Summary';
import styles from './Main.module.css';
import { commerce } from '../../lib/commerce';

const Main = () => {

  const [formData, setFormData] = useState({});
  const { setCheckoutToken } = useCartDispatch();
  const state  = useCartState();

  useEffect(() => {
    generateCheckoutToken();
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

  const handleOrderProcessing = () => {
    let data = {};
  }

  const [counter, setCounter] = useState(0);
  const handleIncreaseCounter = () => setCounter(counter + 1);
  const handleDecreaseCounter = () => setCounter(counter - 1);

  const displayCurrentComponent = step => {
    switch(step) {
      case 1:
        return (state.checkoutToken && 
        <AddressForm 
          handleStepBackward={handleDecreaseCounter} 
          handleStepForward={handleIncreaseCounter}
          checkoutTokenID={state.checkoutToken.id} 
          setFormData={setFormData}
          /> );
      case 2:
        return <Summary 
                data={formData} 
                handleOrderProcessing={handleOrderProcessing} 
                handleStepBackward={handleDecreaseCounter}
                />
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