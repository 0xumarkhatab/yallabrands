import Head from 'next/head'
import Image from 'next/image'
import { useState } from 'react';
import styles from '../styles/Home.module.css'

export default function Home() {
  const maxTotalSupply = 100;
  const totalSupply = 20;
  const [nftBuyCount, setNftBuyCount] = useState(1);

  let maxNftBuyCount = 10;

  function increase() {
    if (nftBuyCount < 10)
      setNftBuyCount(prev => prev + 1);
  }
  function decrease() {
    if (nftBuyCount > 1)
      setNftBuyCount(prev => prev - 1);

  }


  return (
    <>
      <div className={styles.bg}> </div>
      <div className={styles.app}>
        <div className={styles.main}>
          <div className={styles.header}>
            <div className={styles.title}>Azuki</div>
            <div className={styles.description}>Total supply: {totalSupply} NFTs</div>

          </div>



          <div className={styles.nft__slideshow}>
            <div className={styles.nft__slideshow__left}>
              <img src='./nft_slideshow.gif' />
            </div>
            <div className={styles.nft__slideshow__right}>
              <p>Price Per NFT</p>
              <h3>0.25Eth + gas fee </h3>
              <p>Limited Mint Time</p>
              <p>Aug 9-6am EST</p>
            </div>

          </div>
          <div className={styles.nft__selector}>
            <div className={styles.nft__selector__left}>
              <button onClick={decrease}><img className={styles.minusImage} src="./minus.png" /></button>
              <p>{nftBuyCount}</p>
              <button onClick={increase}><img src="./plus.png" /></button>

            </div>
            <div className={styles.nft__selector__right}>
              <p>{maxNftBuyCount} Max</p>
            </div>

          </div>
          <div className={styles.nft__fee}>
            <div className={styles.nft__fee__left}>
              <p>Total</p>
            </div>
            <div className={styles.nft__fee__right}>
              {0.25 * nftBuyCount} ETH + gas
            </div>

          </div>
          <div className={styles.nft__mint__button}>
            MINT NOW
          </div>
          <div className={styles.nft__minted}>
            Minted: {totalSupply}/{maxTotalSupply}
          </div>


        </div>

      </div>


    </>

  )
}
