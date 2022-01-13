import Slider from "react-slick";
import styles from './Hero.module.css';
import Image from 'next/image';
import sliderImageFirst from '../../public/images/hero/light_1.jpg';
import sliderImageSecond from '../../public/images/hero/lights.jpg';
import sliderImageThird from '../../public/images/hero/safety.jpg';

const Hero = () => {

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    speed: 4000
  };

  return (
    <div className={styles.slider}>
      <Slider {...settings}>
        <div className={styles.slider__content}>
          <Image src={sliderImageFirst} />
        </div>
        <div className={styles.slider__content}>
          <div className={styles.slider__box}>
            <h2 className={styles.slider__title}>
              Safety &amp; Security<br/>
              <span>Check Our New Lights!</span>
            </h2>
          </div>
          <Image src={sliderImageSecond} />
        </div>
        <div className={styles.slider__content}>
          <div className={styles.slider__box}>
            <h2 className={styles.slider__title}>
              Safety &amp; Security<br/>
              <span>Check Our New Lights!</span>
            </h2>
          </div>
          <Image src={sliderImageThird} />
        </div>
      </Slider>
    </div>
  )
};

export default Hero;