import styles from './Cart.module.css';
import { useCartDispatch, useCartState } from '../../context/cart';
import { commerce } from '../../lib/commerce';
import { useRouter } from 'next/router'
import { BsX, BsEmojiSmile, BsArrowLeft } from 'react-icons/bs';

const Cart = () => {
  const state = useCartState();
  const { setCart } = useCartDispatch();
  const handleUpdateCart = cart => setCart(cart);

  const router = useRouter();

  const handleDelete = async id => {
    const res = await commerce.cart.remove(id);
    handleUpdateCart(res.cart);
  }

  const increaseQuantity = async (id, quantity) => {
    const res = await commerce.cart.update(id, { quantity: quantity + 1 });
    handleUpdateCart(res.cart);
  }

  const decreaseQuantity = async (id, quantity) => {
    if(quantity > 1) {
      const res = await commerce.cart.update(id, { quantity: quantity - 1 });
      handleUpdateCart(res.cart);
    } else {
      handleDelete(id);
    }
  }

  const handleClearCart = async () => {
    const res = await commerce.cart.empty();
    handleUpdateCart(res.cart);
  }

  const displayItems = () => {
    return (
      <>
        <div className={styles.col_8}>
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
              <button 
                type="button"
                onClick={() => router.push('/bikes')}
                className={`${styles.button__cta} ${styles.button__cta_continue}`}
              >
                <BsArrowLeft />
                Continue Shopping
              </button>
            </div> 
            <div className={styles.total}>
              <div className={styles.total__top}>
                <div className={styles.total__sub}>
                  <p>Subtotal:</p>
                  <span className={styles.total__price}>{state.subtotal.formatted_with_code}</span>
                </div>
                <div className={styles.total__sub}>
                  <p>Shipping:</p>
                  <span className={styles.total__price}>Free</span>
                </div>
              </div>
              <div className={styles.total__bottom}>
                <div className={styles.total__sub}>
                  <p>Subtotal:</p>
                  <span className={styles.total__price}>{state.subtotal.formatted_with_code}</span>  
                </div>
              </div>
            </div>  
          </div>
        </div>
        <div className={styles.col_4}>

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
    <div className={styles.container}>
      {state.line_items.length ? displayItems() : displayMessage()}
    </div>
  )
}

export default Cart;