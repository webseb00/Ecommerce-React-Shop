import styles from './Newsletter.module.css';

const Newsletter = () => {
  return (
    <div className={styles.newsletter}>
      <h3 className={styles.newsletter__title}>Want to stay up to date? <br/>So, join our newsletter!</h3>
      <form className={styles.newsletter__form} method="post">
        <input type="submit" className={styles.newsletter__submit} value="Join" />
        <input type="email" name="newsletter" className={styles.newsletter__input} placeholder="example@email.com" required />
      </form>
    </div>
  )
};

export default Newsletter;