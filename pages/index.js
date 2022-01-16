import Head from 'next/head';
import { commerce } from '../lib/commerce';
// Shop Components
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Bikes from '../components/Bikes/Bikes';
import Newsletter from '../components/Newsletter/Newsletter';
import Brands from '../components/Brands/Brands';

export default function Home() {
  return (
      <>
      <Head>
        <title>BikeShop</title>
        <meta name="description" content="BikeShop" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Hero />
      <Features />
      <Bikes />
      <Newsletter />
      <Brands />
    </>
  )
}
