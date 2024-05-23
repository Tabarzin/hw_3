import Header from '@components/Header';
import React from 'react';
import Text from '@components/Text';
import styles from './AboutUs.module.scss';
import team from '@assets/lalasia_team.jpg';

const AboutUs = () => {
  return (
    <div>
      <Header />

      <Text tag="h1" className={styles.about}>
        About us
      </Text>
      <Text tag="p" className={styles.about_text}>
        <img src={team} alt="Lalasia Team" className={styles.about_team} />
        Welcome to Lalasia, your premier destination for unique and high-quality products! Founded in 2010, Lalasia
        began as a small family-owned business with a passion for curating exceptional items that bring joy and
        convenience to everyday life. Over the years, we've grown into a trusted e-commerce shop, beloved by our
        customers for our commitment to excellence and personalized service. At Lalasia, we believe in the power of
        community, integrity, and sustainability. Our values are at the heart of everything we do. We meticulously
        select products that not only meet our high standards for quality but also align with our dedication to
        environmental responsibility.
      </Text>
      <Text tag="p" className={styles.about_text}>
        We work closely with ethical suppliers and artisans to ensure that every purchase supports fair trade practices
        and sustainable production methods. Our mission is to provide our customers with a delightful shopping
        experience, offering products that inspire and enhance their lives. Whether you're looking for the latest in
        home décor, fashion, or tech gadgets, Lalasia is here to meet your needs with a smile. Thank you for being a
        part of our journey. We look forward to serving you and continuing to grow together with our valued community.
      </Text>
      <Text tag="p">
        Our values are at the heart of everything we do. We meticulously select products that not only meet our high
        standards for quality but also align with our dedication to environmental responsibility. We work closely with
        ethical suppliers and artisans to ensure that every purchase supports fair trade practices and sustainable
        production methods. Our mission is to provide our customers with a delightful shopping experience, offering
        products that inspire and enhance their lives. Whether you're looking for the latest in home décor, fashion, or
        tech gadgets, Lalasia is here to meet your needs with a smile. Thank you for being a part of our journey. We
        look forward to serving you and continuing to grow together with our valued community.
      </Text>
    </div>
  );
};

export default AboutUs;
