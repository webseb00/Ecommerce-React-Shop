import { useEffect } from 'react';
import { BsX, BsCheck } from 'react-icons/bs';
import styles from './Alert.module.css';

const Alert = ({ message, type, handleClose, timeout = null }) => {

  useEffect(() => {
    if(!timeout) return false;

    setTimeout(() => handleClose(), timeout);
  }, []);

  return (
    <div className={`${styles.alert} ${type === 'success' ? styles.alert__success : styles.alert__danger}`}>
      <button 
        type="button"
        className={styles.alert__close}
        onClick={handleClose}
      >
        <BsX />
      </button>
      <div className={styles.alert__content}>
        {type === 'success' ? <BsCheck /> : ''}
        {message}
      </div>
    </div>
  )
};

export default Alert;