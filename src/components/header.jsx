import React, { useState, useEffect } from "react";
import Link from "next/link";
import styles from "./Header.module.scss";
import {
  isInstalled,
  getAddress,
  getPublicKey,
  getNetwork,
  on,
} from "@gemwallet/api";
import LogoLendX from "@/assets/logolendX.png";
// import LogoLendX from "../../public/logolendX.png";

export default function Header() {
  const [address, setAddress] = useState();
  const handleConnect = () => {
    isInstalled().then((response) => {
      if (response.result.isInstalled) {
        getAddress().then((response) => {
          let yourAddress = response.result?.address;
          console.log(`Your address: ${yourAddress}`);
          setAddress(yourAddress);
        });
      }
      getPublicKey().then((response) => {
        console.log("and");
        console.log(
          `${response.result?.address} - ${response.result?.publicKey}`
        );
      });
      getNetwork().then((response) => {
        console.log("network");
        console.log(response.result?.network);
      });
    });
  };

  function handleDisconnect() {
    console.log("Disconnect");
    setAddress();
  }

  return (
    <div className={styles.mainHeader}>
      <Link href="/">
        <svg
          width="146"
          height="54"
          viewBox="0 0 146 54"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M14 0.0206976H0V21.0207H14V0.0206976Z" fill="white" />
          <path
            d="M0 53.0207V34.0207H14V41.5207H34.5V53.0207H0Z"
            fill="white"
          />
          <path
            d="M57.5 34.0207H43V53.0207H59.5C62.6667 53.0207 69 53.0207 77 49.0207C85 45.0207 86.6667 37.6874 87.5 34.0207H72.5C68 41.5207 62.5 41.0207 57.5 41.0207V34.0207Z"
            fill="white"
          />
          <path
            d="M43 0.0206976V21.0207H57.5V11.5208H63.5C69.9 11.5208 72.1667 17.854 72.5 21.0207H88.5C87.6667 17.5207 84.9 9.4207 80.5 5.0207C76.1 0.620697 64.6667 -0.145969 59.5 0.0206976H43Z"
            fill="white"
          />
          <path
            d="M107 21.0207L93.5 0.0206976H109.5L119 16.0208L128 0.0206976H145L131.5 21.0207H107Z"
            fill="white"
          />
          <path
            d="M132.5 34.0207H105L92.5 53.0208H109L119 36.5208L129.5 53.0208H146L132.5 34.0207Z"
            fill="white"
          />
        </svg>
      </Link>
      {/* <Link href="/send">Send</Link>
      <Link href="/escrow">Escrow</Link> */}
      {address ? (
        <div className={styles.connectBtn} onClick={handleDisconnect}>
          {address.substr(0, 4) + "..." + address.substr(address.length - 4)}
        </div>
      ) : (
        <div className={styles.connectBtn} onClick={handleConnect}>
          Connect
        </div>
      )}
    </div>
  );
}
