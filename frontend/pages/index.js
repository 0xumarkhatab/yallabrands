import Head from 'next/head'
import Image from 'next/image'
import { useEffect, useRef, useState } from 'react';
import styles from '../styles/Home.module.css'
import Web3Modal from "web3modal";
import { providers, Contract } from "ethers";

export default function Home() {
  const maxTotalSupply = 100;
  const totalSupply = 20;
  const [nftBuyCount, setNftBuyCount] = useState(1);
  const [connected, setConnected] = useState(false);
  let maxNftBuyCount = 10;


  let web3ModalRef = useRef();

  // Credit : LearnWeb3Dao Sophomore track

  const getProviderOrSigner = async (needSigner = false) => {
    // Connect to Metamask
    // Since we store `web3Modal` as a reference, we need to access the `current` value to get access to the underlying object
    const provider = await web3ModalRef.current.connect();
    const web3Provider = new providers.Web3Provider(provider);

    // If user is not connected to the Rinkeby network, let them know and throw an error
    const { chainId } = await web3Provider.getNetwork();
    if (chainId !== 4) {
      window.alert("Change the network to Rinkeby");
      throw new Error("Change network to Rinkeby");
    }

    if (needSigner) {
      const signer = web3Provider.getSigner();
      return signer;
    }
    return web3Provider;
  };

  /*
        connectWallet: Connects the MetaMask wallet
      */
  const connectWallet = async () => {
    try {
      // Get the provider from web3Modal, which in our case is MetaMask
      // When used for the first time, it prompts the user to connect their wallet
      await getProviderOrSigner();
      setConnected(true);
    } catch (err) {
      console.error(err);
    }
  };





  async function mint() {
    alert("minting");

  }

  function increase() {
    if (nftBuyCount < 10)
      setNftBuyCount(prev => prev + 1);
  }
  function decrease() {
    if (nftBuyCount > 1)
      setNftBuyCount(prev => prev - 1);

  }

  async function updateInformation() {

  }

  useEffect(() => {
    if (!connected) {
      web3ModalRef.current = new Web3Modal({
        network: "rinkeby",
        providerOptions: {},
        disableInjectedProvider: false,
      })
      connectWallet();

    }
    updateInformation();
  }, [connected])




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
          <div onClick={connected ? mint : connectWallet} className={styles.nft__mint__button}>
            {connected ? "MINT NOW" : "CONNECT WALLET"}
          </div>
          <div className={styles.nft__minted}>
            Minted: {totalSupply}/{maxTotalSupply}
          </div>


        </div>

      </div>


    </>

  )
}
