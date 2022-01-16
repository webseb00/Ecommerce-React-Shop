import Header from '../Header/Header';
import Navbar from '../Navbar/Navbar';
import Footer from '../Footer/Footer';
import styles from '../../styles/Home.module.css';

const Layout = ({ children }) => {
  return (
    <>
      <Header>
        <Navbar />
      </Header>
          {children}
      <Footer />
    </>
  )
};

export default Layout;