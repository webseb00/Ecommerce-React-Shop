import { useState } from 'react';
import Link from "next/link";
import styles from './Navbar.module.css';
import { BsHandbag, BsCaretDownFill } from 'react-icons/bs';
import { FaBars } from 'react-icons/fa';
import { useCartState } from '../../context/cart';

const Navbar = () => {
  const state = useCartState();
  
  const [mobileNav, setMobileNav] = useState(false);

  return (
    <nav className={styles.navbar}>
      <div className={styles.navbar__brand}>
        <Link href="/">BikeShop</Link><span>.com</span>
      </div>
      <div className={styles.navbar__menu}>
        <FaBars className={styles.navbar__mobile} onClick={() => setMobileNav(!mobileNav)} />
        <ul className={`${styles.navbar__list} ${mobileNav ? styles.list_active : ''}`}>
          <li className={styles.navbar__item}>
            <Link href="/"><span className={styles.navbar__link}>Homepage</span></Link>
          </li>
          <li className={`${styles.navbar__item} ${styles.dropdown}`}>
            <Link href="/bikes">
              <a>
                <span className={`${styles.navbar__link} ${styles.navbar__link_icon}`}>
                  Bikes
                  <BsCaretDownFill className={styles.navbar__icon} />  
                </span>
              </a>
            </Link>
            <ul className={styles.dropdown__list}>
              <li className={styles.dropdown__item}>
                <Link href={{
                  pathname: '/categories/[slug]',
                  query: { slug: 'downhill' }
                }}>
                  <a className={styles.dropdown__link}>Downhill</a>
                </Link>
              </li>
              <li className={styles.dropdown__item}>
                <Link href={{
                  pathname: '/categories/[slug]',
                  query: { slug: 'cross-country' }
                }}>
                  <a className={styles.dropdown__link}>Cross Country</a>
                </Link>
              </li>
              <li className={styles.dropdown__item}>
                <Link href={{
                  pathname: '/categories/[slug]',
                  query: { slug: 'road-bikes' }
                }}>
                  <a className={styles.dropdown__link}>Road Bikes</a>
                </Link>
              </li>
            </ul>
          </li>
          <li className={styles.navbar__item}>
            <Link href="/parts"><span className={styles.navbar__link}>Parts</span></Link>
          </li>
          <li className={styles.navbar__item}>
          < Link href="/blog"><span className={styles.navbar__link}>Blog</span></Link>
          </li>
          <li className={styles.navbar__item}>
            <Link href="/faq"><span className={styles.navbar__link}>FAQ</span></Link>
          </li>
        </ul>
      </div>
      <div className={styles.cart}>
        <Link href="/checkout">
          <div className={styles.cart__link}>
            <BsHandbag className={styles.cart__icon} />
            <span className={styles.cart__counter}>
              {state.total_unique_items}
            </span>
          </div>
        </Link>
      </div>
    </nav>
  )
};

export default Navbar;