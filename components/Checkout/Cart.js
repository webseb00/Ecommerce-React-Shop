import { useEffect, useState } from 'react';
import styles from './Cart.module.css';
import { useCartDispatch, useCartState } from '../../context/cart';
import { commerce } from '../../lib/commerce';
import { useRouter } from 'next/router'
import { BsX, BsEmojiSmile, BsArrowLeft } from 'react-icons/bs';

const Cart = ({ handleStepForward }) => {
  const state = useCartState();
  const { subtotal, total, discount } = state;

  const { setCart, setCheckoutToken, refreshCart } = useCartDispatch();
  const router = useRouter();

  const [discountCode, setDiscount] = useState('');
  const [noDiscountCode, setNoDiscountCode] = useState(false);

  // const handleDiscountCode = async () => {
  //   if(!discountCode) {
  //     setNoDiscountCode(!noDiscountCode);
  //     return false;
  //   } else {
  //     const res = await commerce.checkout.checkDiscount(state.checkoutToken, { code: discountCode });
  //     if(!res.valid) { 
  //       return false;
  //     } else {
  //       setNoDiscountCode(null);
  //       const { live: { discount, total, subtotal } } = res;
  //       setCart({ discount, total, subtotal });
  //     }
  //   }
  // }

  const handleUpdateCart = cart => setCart(cart);
  
  const handleDelete = async id => {
    const { cart } = await commerce.cart.remove(id);
    handleUpdateCart(cart);
    if(state.total_items === 0) setCheckoutToken(null);
  }

  const increaseQuantity = async (id, quantity) => {
    const { cart } = await commerce.cart.update(id, { quantity: quantity+1 });
    handleUpdateCart(cart);
  }

  const decreaseQuantity = async (id, quantity) => {
    const { cart } = await commerce.cart.update(id, { quantity: quantity-1 });
    if(cart.line_items < 1) { handleDelete(id); }
    handleUpdateCart(cart);
  }

  const handleClearCart = async () => {
    const { cart } = await commerce.cart.empty();
    handleUpdateCart(cart);
  }

  const displayItems = () => {
    return (
      <>
      <div className={styles.content}>
        <div className={styles.grid}>
          <div className={styles.grid__header}>
            <div className={styles.grid__cell}>Product</div>
            <div className={styles.grid__cell}>Quantity</div>
            <div className={styles.grid__cell}>Product Price</div>
            <div className={styles.grid__cell}>Remove</div>
          </div>
          <div className={styles.grid__body}>
            {state.line_items.map((item, index) => (
              <div key={index} className={`${styles.grid__row} ${styles.product}`}>
                <div className={styles.product__preview}>
                  <div className={styles.product__image}><img src={item.image.url} alt={item.name} /></div>
                  <p><b>{item.name}</b></p>
                </div>
                <div className={styles.product__quantity}>
                  <button type="button" onClick={() => increaseQuantity(item.id, item.quantity)}>+</button>
                  <span className={styles.product__counter}>{item.quantity}</span>
                  <button type="button" onClick={() => decreaseQuantity(item.id, item.quantity)}>-</button>
                </div>
                <div className={styles.product__price}>
                  <p>{item.line_total.formatted_with_code}</p>
                </div>
                <div className={styles.product__delete}>
                  <button 
                    type="button"
                    onClick={() => handleDelete(item.id)}
                    className={styles.item__delete}
                  >
                    <BsX />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className={styles.summary}>
          <div className={styles.summary__cta}>
            <button 
              type="button"
              onClick={handleClearCart}
              className={`${styles.button__cta} ${styles.button__cta_clear}`}
            >
              Clear Cart
            </button>
          </div> 
          <div className={styles.total}>
            <div className={styles.total__top}>
              {/* <div className={styles.discount}>
                <div className={styles.discount__box}>
                  <button type="button" className={styles.discount__submit} onClick={handleDiscountCode}>Apply</button>
                  <input 
                    type="text" 
                    name="discount" 
                    value={discountCode} 
                    className={styles.discount__input} 
                    onChange={e => setDiscount(e.target.value)} 
                    placeholder="BD78034500" 
                  />
                </div>
                {noDiscountCode && <p>Discount code not entered</p>}
              </div> */}
              <div className={styles.total__sub}>
                <p>Subtotal:</p>
                <span className={styles.total__price}>{subtotal.formatted_with_code}</span>
              </div>
              <div className={styles.total__sub}>
                <p>Discount:</p>
                <span className={styles.total__price}>
                  {discount.amount_saved?.formatted_with_code || '-'}
                </span>
              </div>
            </div>
            <div className={styles.total__bottom}>
              <div className={styles.total__sub}>
                <p>Total:</p>
                <span className={styles.total__price}>{subtotal.formatted_with_code}</span>  
              </div>
            </div>
          </div>  
        </div>
        <div className={styles.panel}>
          <button 
            type="button"
            onClick={() => router.push('/bikes')}
            className={`${styles.button__cta} ${styles.button__cta_back}`}
          >
            <BsArrowLeft />
            Continue Shopping
          </button>
          <button 
            type="button"
            onClick={handleStepForward}
            className={`${styles.button__cta} ${styles.button__cta_continue}`}
          >
            Checkout
          </button>
        </div>
      </div>
      </>
    )
  }

  const displayMessage = () => {
    return (
      <>
        <h3 className={styles.title}>
          Your cart is empty...<br/>
          <span>Please go back and do some shopping <BsEmojiSmile/></span>
        </h3>
      </>
    )
  }

  return (
    <>
      {state.line_items.length ? displayItems() : displayMessage()}
    </>
  )
}

export default Cart;