import styles from './Brands.module.css';
import Image from 'next/image';
import Brand_1 from '../../public/images/brands/trek.png';
import Brand_2 from '../../public/images/brands/kross.png';
import Brand_3 from '../../public/images/brands/cube.png';
import Brand_4 from '../../public/images/brands/merida.png';
import Brand_5 from '../../public/images/brands/specialized.png';
import Brand_6 from '../../public/images/brands/scott.png';

const Brands = () => {
  return (
    <section className={styles.brands}>
      <div className={styles.brands__container}>
        <div className={styles.brands__item}>
          <a href="#">
            <Image 
              src={Brand_1}
              alt="brand"
            />
          </a>
        </div>
        <div className={styles.brands__item}>
          <a href="#">
            <Image 
              src={Brand_2}
              alt="brand"
            />
          </a>
        </div>
        <div className={styles.brands__item}>
          <a href="#">
            <Image 
              src={Brand_3}
              alt="brand"
            />
          </a>
        </div>
        <div className={styles.brands__item}>
          <a href="#">
            <Image 
              src={Brand_4}
              alt="brand"
            />
          </a>
        </div>
        <div className={styles.brands__item}>
          <a href="#">
            <Image 
              src={Brand_5}
              alt="brand"
            />
          </a>
        </div>
        <div className={styles.brands__item}>
          <a href="#">
            <Image 
              src={Brand_6}
              alt="brand"
            />
          </a>
        </div>
      </div>
    </section>
  )
};

export default Brands;