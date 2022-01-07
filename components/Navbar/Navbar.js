import Link from "next/link";
import styles from './Navbar.module.css';

const Navbar = () => {
  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__brand}>
        <Link href="/">BikeShop</Link><span>.com</span>
      </div>
      <ul className={styles.navbar__list}>
        <Link href="/products/bikes"><span className={styles.navbar__link}>Homepage</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>Bikes</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>Parts</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>Blog</span></Link>
        <Link href="/products/bikes"><span className={styles.navbar__link}>FAQ</span></Link>
      </ul>
    </nav>
  )
};

export default Navbar;