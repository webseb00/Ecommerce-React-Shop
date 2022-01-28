import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from './Layout.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
        <main className={styles.main}>
          {children}
        </main>
      <Footer />
    </>
  )
};

export default Layout;