import Link from "next/link";
import styles from './Navbar.module.css';
import { FaShoppingCart } from 'react-icons/fa';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__brand}>
        <Link href="/">BikeShop</Link><span>.com</span>
      </div>
      <div className={styles.navbar__list}>
        <Link href="/"><span className={styles.navbar__link}>Homepage</span></Link>
        <Link href="/products"><span className={styles.navbar__link}>Bikes</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>Parts</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>Blog</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>FAQ</span></Link>
      </div>
      <div className={styles.cart}>
        <Link href="/">
          <div className={styles.cart__link}>
            <div className={styles.cart__counter}>
              <span>10</span>
            </div>
            <FaShoppingCart className={styles.cart__icon} />
          </div>
        </Link>
      </div>
    </nav>
  )
};

export default Navbar;