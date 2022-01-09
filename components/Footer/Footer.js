import styles from './Footer.module.css';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.wrapper}>
        <div className={styles.bottom}>
          <p>&copy; BikeShop Bicycle Corporation 2022. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;