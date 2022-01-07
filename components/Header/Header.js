import styles from './Header.module.css';
import { BsTelephone } from 'react-icons/bs';
import { BsFacebook } from 'react-icons/bs';
import { BsYoutube } from 'react-icons/bs';
import { BsTwitter } from 'react-icons/bs';
import { BsMailbox } from 'react-icons/bs';
import { BsGeoAltFill } from 'react-icons/bs';

const Header = ({ children }) => {
  return (
    <header className={styles.header}>
      <div className={styles.info}>
        <div className={styles.address}>
          <p><BsTelephone className={styles.icon} /> (+48) 500 400 300</p>
          <p><BsMailbox className={styles.icon} /> bikeshop@mail.com</p>
          <p><BsGeoAltFill className={styles.icon} /> Warsaw, BikeShop Street, 47891</p>
        </div>
        <div className={styles.socials}>
          <a href="#">
            <BsFacebook />
          </a>
          <a href="#">
            <BsYoutube />
          </a>
          <a href="#">
            <BsTwitter />
          </a>
        </div>
      </div>
      <div className={styles.main}>
        {children}
      </div>
    </header>
  )
}

export default Header;