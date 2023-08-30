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
      <Link href="/">Go to Accueil</Link>
      <Link href="/send">Send</Link>
      <Link href="/escrow">Escrow</Link>
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
