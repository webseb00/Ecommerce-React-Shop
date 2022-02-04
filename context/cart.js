import { createContext, useContext, useReducer, useEffect } from "react";
import { commerce } from '../lib/commerce';

const CartStateContext = createContext();
const CartDispatchContext = createContext();

const SET_CART = 'SET_CART';
const SET_CHECKOUT_TOKEN = 'SET_CHECKOUT_TOKEN';

const initialState = {
  checkoutToken: {},
  total_items: 0,
  total_unique_items: 0,
  line_items: []
}

const reducer = (state, action) => {
  switch(action.type) {
    case SET_CART:
      return { ...state, ...action.payload };
    case SET_CHECKOUT_TOKEN:
      return { ...state, checkoutToken: action.payload }
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
}

export function CartProvider({ children }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  useEffect(() => {
    getCart();
  }, []);

  const setCheckoutToken = token => {
    dispatch({ type: SET_CHECKOUT_TOKEN, payload: token });
  }

  const setCart = cart => {
    dispatch({ type: SET_CART, payload: cart });
  }

  const getCart = async () => {
    try {
      const cart = await commerce.cart.retrieve();
      setCart(cart);
    } catch(err) {
      console.log('An error occurred');
    }
  }

  const refreshCart = async () => {
    try {
      const newCart = await commerce.cart.refresh();
      setCart(newCart);
    } catch(err) {
      console.log(`There was an error refreshing the cart ${err}.`);
    }
  }

  return (
    <CartDispatchContext.Provider value={{ setCart, setCheckoutToken, refreshCart }}>
      <CartStateContext.Provider value={state}>
        {children}
      </CartStateContext.Provider>
    </CartDispatchContext.Provider>
  )
}

export const useCartState = () => useContext(CartStateContext);
export const useCartDispatch = () => useContext(CartDispatchContext);