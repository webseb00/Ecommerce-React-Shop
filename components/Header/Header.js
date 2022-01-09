import styles from './Header.module.css';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsEnvelopeFill } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';
import { BsPersonFill } from 'react-icons/bs';

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <div className={styles.address}>
          <p><BsFillTelephoneFill className={styles.icon} /> (+48) 500 400 300</p>
          <p><BsEnvelopeFill className={styles.icon} /> bikeshop@mail.com</p>
          <p><BsGeoAltFill className={styles.icon} /> Warsaw, BikeShop Street, 47891</p>
        </div>
        <div className={styles.login}>
          <BsPersonFill  className={styles.login__icon} />
          <p className={styles.login__text}>Sign In</p>
        </div>
        {/* <div className={styles.socials}>
          <a href="#">
            <BsFacebook />
          </a>
          <a href="#">
            <BsYoutube />
          </a>
          <a href="#">
            <BsTwitter />
          </a>
        </div> */}
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </header>
  )
}

export default Header;