import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';
import Hero from '../components/Hero/Hero';
import Features from '../components/Features/Features';
import Bikes from '../components/Bikes/Bikes';
import Footer from '../components/Footer/Footer';

export default function Home() {
  return (
      <>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="BikeShop" />
        <meta name="viewport" content="initial-scale=1, width=device-width" />
        <link rel="icon" href="/favicon.ico" />
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;600&display=swap" rel="stylesheet"></link>
      </Head>

      <Header>
        <Navbar />
      </Header>
      <Hero />
      <Features />
      <Bikes />
      <div className={styles.container}>

      <main className={styles.main}>
        
      </main>

      </div>
      <Footer />
    </>
  )
}
