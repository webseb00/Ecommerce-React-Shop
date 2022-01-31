import styles from './AddressForm.module.css';
import button from './Cart.module.css';
import { BsArrowLeft } from 'react-icons/bs';

const Summary = ({ data, handleOrderProcessing, handleStepBackward }) => {
  return (
    <>
      <h2>Summary order...</h2>
      <p>{data.firstName} {data.lastName}</p>
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
          Order Form
        </button>
      </div>
    </>
  )
}

export default Summary;