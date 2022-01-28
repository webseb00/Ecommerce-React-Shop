import { useState, useContext } from 'react';
import { useRouter } from 'next/router';
import { FaArrowLeft , FaCartPlus } from 'react-icons/fa';
import { AiOutlineCloseCircle } from 'react-icons/ai';
import { BsChevronLeft, BsChevronRight } from 'react-icons/bs';
import { commerce } from '../../../lib/commerce';
import { useCartDispatch } from '../../../context/cart';
import Alert from '../../Alert/Alert';
import styles from './ProductPage.module.css';

const ProductPage = ({ product }) => {
  const { id, name, image, price, inventory, description, assets } = product;

  const [counter, setCounter] = useState(0);
  const [thumbnail, setThumbnail] = useState(assets[counter]);
  const [modal, setModal] = useState(false);
  const [alert, setAlert] = useState({
    show: false,
    message: null,
    type: null,
  });

  const { setCart } = useCartDispatch();
  const router = useRouter();
  
  const handleModal = () => {
    setModal(!modal);
  }

  const slideNext = () => {
    setCounter(counter + 1);
    if(counter >= assets.length-1) { 
      setCounter(counter = 0);
    }
  }

  const slidePrev = () => {
    setCounter(counter - 1);
    if(counter === 0) {
      setCounter(counter = assets.length-1);
    }
  }

  const modalWindow = () => {
    return (
      <div className={styles.modal}>
        {assets.length > 1 && 
          <button 
            className={`${styles.slider__button} ${styles.slider__prev}`}
            type="button" 
            onClick={slidePrev}>
              <BsChevronLeft />
          </button>
        }
        <div className={styles.modal__wrapper}>
          <button type="button" className={styles.modal__close} onClick={handleModal}>
            <AiOutlineCloseCircle />
          </button>
          <img src={assets[counter].url} />  
        </div> 
        {assets.length > 1 && 
          <button 
            className={`${styles.slider__button} ${styles.slider__next}`}
            type="button" 
            onClick={slideNext}>
              <BsChevronRight />
          </button>
        }
      </div>
    )
  }

  const handleThumbnail = e => {
    setThumbnail({ url: e.target.src });
  }

  const ItemGallery = () => {
    return (
      <ul className={styles.thumbnail}>
        {assets.map((item, index) => (
          <li className={styles.thumbnail__item} key={index}>
            <img 
              src={item.url} 
              alt={item.filename.split('.jpg')[0]} 
              onClick={handleThumbnail}
            />
          </li>
        ))}
      </ul>
    )
  }

  const handleAddToCart = async () => {
    const data = await commerce.cart.add(id, 1);

    if(data.success) { 
      setCart(data.cart);
      setAlert({
        show: true,
        message: `${name} has been added to your cart!`,
        type: 'success'
      }); 
    } else { 
      setAlert({
        show: true,
        message: `An error occured, please try again later.`,
        type: 'danger'
      }); 
    }
  }

  const closeAlertBox = () => setAlert({ ...alert, show: false });

  return (
    <>
     {alert.show && 
     <Alert 
      message={alert.message} 
      type={alert.type} 
      handleClose={closeAlertBox}
      timeout={4000}
    />}
      <div className={styles.product}>
        <header className={styles.product__header}>
          <div className={styles.product__gallery}>
            <div className={styles.product__image}>
              <img 
                src={thumbnail.url} 
                onClick={handleModal} 
              />
            </div>
            {assets.length > 1 && ItemGallery()}
          </div>
          {modal && modalWindow()}
          <div className={styles.product__right}>
            <div className={styles.product__details}>
              <h2>{name}</h2>
              <p><b>{price.formatted_with_code}</b></p>
              <p><b>Available quantity: </b> {inventory.available}</p>
            </div>
            <div className={styles.product__checkout}>
              {inventory.available !== 0 ? 
                <button 
                  className={styles.product__button_cart} 
                  type="button"
                  onClick={handleAddToCart}
                >
                  <FaCartPlus />
                  Add To Cart
                </button>
                :
                <h5 className={styles.product__text_danger}>Product is sold out!</h5>
            }
            </div>
          </div>
        </header>
        <div className={styles.product__body}>
          <div className={styles.product__description} dangerouslySetInnerHTML={{__html: description}} />
          <button 
            className={styles.product__button_back}
            type="button" 
            onClick={() => router.back()}
          >
            <FaArrowLeft />
            Go Back
          </button>
        </div>
      </div>
    </>
  )
};

export default ProductPage;