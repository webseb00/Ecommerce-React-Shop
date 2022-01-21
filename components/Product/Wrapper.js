import SideNav from './SideNav/SideNav';
import ProductItem from './ProductItem/ProductItem';
import styles from './Wrapper.module.css';

const Wrapper = ({ items }) => {
  return (
    <div className={styles.wrapper}>
      <SideNav />
      <div className={styles.wrapper__items}>
        {items.map((item, index) => (
          <ProductItem 
            key={index} 
            id={item.id}
            image={item.image.url} 
            title={item.name}
            price={item.price.formatted_with_code}
            permalink={item.permalink}
          />
        ))}
      </div>
    </div>
  )
};

export default Wrapper;