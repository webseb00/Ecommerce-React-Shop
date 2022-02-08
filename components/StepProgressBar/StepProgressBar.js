import styles from './StepProgressBar.module.css';
import { BsCheck2 } from 'react-icons/bs';

const StepProgressBar = ({ currentComponent, steps }) => {

  const displayStepsBar = () => {
    return steps.map((item, index) => (
      <div key={index} className={styles.step__item}>
        {
          steps.length === index+1 ? '' : 
          <div className={`${styles.step__line} ${currentComponent - index === 1 || index < currentComponent ? styles.fulfilled : ''}`}></div>
        }
        <div className={`${styles.step__circle} ${index < currentComponent || index === currentComponent ? styles.fulfilled : ''}`}>
          <span className={styles.step__icon}>
            {index < currentComponent ? <BsCheck2 /> : index+1}
          </span>
        </div>
        <span className={styles.step__label}>
          {item.label}
        </span>
      </div>
    ))
    }

  return (
    <div className={styles.step}>
      {displayStepsBar()}
    </div>
  )
};

export default StepProgressBar;