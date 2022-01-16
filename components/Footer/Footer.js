import styles from './Footer.module.css';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.links}>
        <div className={styles.links__container}>
          <h5 className={styles.links__title}>About Us</h5>
          <ul className={styles.links__list}>
            <li><Link href="/">Lorem ipsum</Link></li>
            <li><Link href="/">Dolor sit amet</Link></li>
            <li><Link href="/">Aliquam ut dui nisl</Link></li>
            <li><Link href="/">Quisque mattis imperdiet</Link></li>
            <li><Link href="/">Vestibulum ante ipsum</Link></li>
          </ul>
        </div>
        <div className={styles.links__container}>
          <h5 className={styles.links__title}>Services</h5>
          <ul className={styles.links__list}>
            <li><Link href="/">Lorem ipsum</Link></li>
            <li><Link href="/">Dolor sit amet</Link></li>
            <li><Link href="/">Aliquam ut dui nisl</Link></li>
          </ul>
        </div>
        <div className={styles.links__container}>
          <h5 className={styles.links__title}>Products</h5>
          <ul className={styles.links__list}>
            <li><Link href="/">Dolor sit amet</Link></li>
            <li><Link href="/">Aliquam ut dui nisl</Link></li>
            <li><Link href="/">Quisque mattis imperdiet</Link></li>
            <li><Link href="/">Vestibulum ante ipsum</Link></li>
          </ul>
        </div>
        <div className={styles.links__container}>
          <h5 className={styles.links__title}>Questions</h5>
          <ul className={styles.links__list}>
            <li><Link href="/">Lorem ipsum?</Link></li>
            <li><Link href="/">Dolor sit amet?</Link></li>
            <li><Link href="/">Aliquam ut dui nisl?</Link></li>
            <li><Link href="/">Quisque mattis imperdiet?</Link></li>
            <li><Link href="/">Vestibulum ante ipsum?</Link></li>
            <li><Link href="/">Dolor sit amet?</Link></li>
          </ul>
        </div>
      </div>
      <div className={styles.wrapper}>
        <div className={styles.bottom}>
          <p>&copy; BikeShop Bicycle Corporation 2022. All Rights Reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer;