import Image from 'next/image';
import styles from './Bikes.module.css';
import downhill from '../../public/images/downhill.jpeg';
import mtbxc from '../../public/images/mtbxc.jpg';
import road from '../../public/images/road_bike.jpg';
import SectionHeading from '../SectionHeading/SectionHeading';
import Link from 'next/link';

const Bikes = () => {
  return (
    <section className={styles.bikes}>
      <SectionHeading 
        title="Check Our Bikes"
        description="There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable."
      />
      <div className={styles.bikes__container}>
        <Link href="/products/downhill">
          <a className={styles.bikes__item}>
            <h4 className={styles.bikes__title}>Downhill</h4>
            <Image 
              src={downhill} 
              alt="Downhill" 
              objectFit="cover" 
              layout="fill" 
              className={styles.bikes__bg}
            />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.bikes__item}>
            <h4 className={styles.bikes__title}>Cross Country</h4>
            <Image 
              src={mtbxc} 
              alt="mtb xc" 
              objectFit="cover" 
              objectPosition="20%"
              layout="fill" 
              className={styles.bikes__bg}
            />
          </a>
        </Link>
        <Link href="/">
          <a className={styles.bikes__item}>
            <h4 className={styles.bikes__title}>Roads</h4>
            <Image 
              src={road} 
              alt="road bike" 
              objectFit="cover" 
              objectPosition="90% 100%"
              layout="fill" 
              className={styles.bikes__bg}
            />
          </a>
        </Link>
      </div>
    </section>
  )
};

export default Bikes;