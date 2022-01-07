import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import Link from 'next/link';
import Header from '../components/Header/Header';
import Navbar from '../components/Navbar/Navbar';

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
      <div className={styles.container}>

      <main className={styles.main}>
        
      </main>

      <footer className={styles.footer}>

      </footer>
    </div>
    </>
  )
}
