import styles from "./page.module.scss";
import {
  isInstalled,
  sendPayment,
  submitTransaction,
  getAddress,
} from "@gemwallet/api";
import React, { useState, useEffect } from "react";
import { formatDate, hexToString, stringToHex } from "../library/functions";

type Transaction = {
  Account: string;
  TransactionType: "EscrowCreate";
  Amount: string;
  Destination: string;
  CancelAfter: number;
  FinishAfter: number;
  Condition: string;
  DestinationTag: number;
  SourceTag: number;
};

const currentDate = new Date();
currentDate.setMonth(currentDate.getMonth() + 1);
currentDate.setHours(currentDate.getHours() + 2);

const release_date_unix = Math.floor(currentDate.getTime() / 1000);
const release_date_ripple = release_date_unix - 946684800;

const DEFAULT_ADD = "r4FYvHu7KiHHTCWSAqNJ5Xb96Ci4CMcATF";

export default function Home() {
  const [amount, setAmount] = useState<number | string>(""); // État pour gérer la valeur "amount"
  const [collateral, setCollateral] = useState<number>(); // État pour gérer la valeur "collateral"
  const [transactionData, setTransactionData] = useState<any>(null);
  const [escrowData, setEscrowData] = useState<any>(null);
  const [addressA, setAddressA] = useState<any>(null);

  const handleAmountChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newAmount = parseFloat(event.target.value);
    setAmount(newAmount);
    setCollateral(Math.floor(newAmount / 0.6));
  };

  const handleCollateralChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const newCollateral = parseFloat(event.target.value);
    setCollateral(newCollateral);
    setAmount(newCollateral * 0.6);
  };

  const fetchTransactionsWithInterval = (remainingCalls: number) => {
    if (remainingCalls <= 0) {
      return; // Arrêtez la récursion
    }

    setTimeout(() => {
      // fetchTransactions(DEFAULT_ADD);
      mergeDatas();
      fetchTransactionsWithInterval(remainingCalls - 1);
    }, 4000);
  };

  const handleEscrow = () => {
    isInstalled().then((response) => {
      getAddress().then((response) => {
        console.log(response.result?.address);
        setAddressA(response.result?.address);
      });
      if (response.result.isInstalled) {
        const transaction: Transaction = {
          Account: addressA,
          TransactionType: "EscrowCreate",
          Amount: collateral ? (1000000 * collateral).toString() : "0", // Utilise amount s'il est défini, sinon "0"
          Destination: "rHWUQGP3tWwMf5Jqi17h6Wmz4TFRNcew7c",
          CancelAfter: release_date_ripple + 1,
          FinishAfter: release_date_ripple,
          Condition:
            "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
          DestinationTag: 23480,
          SourceTag: 11747,
        };

        submitTransaction({ transaction })
          .then((response) => {
            console.log(response.result?.hash);
          })
          .catch((error: any) => {
            console.error("Transaction submission failed", error);
          });

        fetchTransactionsWithInterval(4); // Appelle 4 fois
      }
    });
  };

  const fetchTransactions = async (address: String) => {
    const API_URL =
      process.env.NODE_ENV === "development"
        ? "http://localhost:3000"
        : "https://lendx-rouge.vercel.app/"; // Replace with your production URL

    try {
      const response = await fetch(
        `${API_URL}/api/transactions/${address || DEFAULT_ADD}`
      );

      if (response.ok) {
        return await response.json();
      } else {
        throw new Error("Failed to fetch data");
      }
    } catch (error: any) {
      throw new Error("Error fetching data: " + error.message);
    }
  };

  async function mergeDatas() {
    try {
      const res1 = await fetchTransactions(DEFAULT_ADD);
      const res2 = await fetchTransactions(
        "rn2CGD25KbnqK32KuNyf2ZAh56GwU7Kiwj"
      );
      console.log(res1);
      console.log(res2);

      const mergedData = res1.concat(res2); // Merge the fetched data

      const uniqueMergedData: Transaction[] = [];
      const seenHashes = new Set();

      // Parcourir les données fusionnées et supprimer les doublons
      mergedData.forEach((entry: any) => {
        if (entry.hash && !seenHashes.has(entry.hash)) {
          uniqueMergedData.push(entry);
          seenHashes.add(entry.hash);
        }
      });

      const memoDataArray = uniqueMergedData
        .map((entry: any) => {
          if (
            entry.Memos &&
            entry.Memos[0] &&
            entry.Memos[0].Memo &&
            entry.Memos[0].Memo.MemoData
          ) {
            return hexToString(entry.Memos[0].Memo.MemoData);
          }
          return null;
        })
        .filter((memoData: any) => memoData !== null);
      //   console.log(memoDataArray);

      const filteredMergedData = uniqueMergedData.filter((entry: any) => {
        if (entry.hash && !memoDataArray.includes(entry.hash)) {
          return true;
        }
        return false;
      });
      //   console.log(uniqueMergedData);
      console.log(filteredMergedData);
      //   console.log("end");
      setTransactionData(filteredMergedData);
    } catch (error: any) {
      console.error("There was a problem:", error.message);
    }
  }

  useEffect(() => {
    mergeDatas();
    // console.log(transactionData);
  }, []);

  useEffect(() => {
    if (transactionData) {
      const escrowTransactions = transactionData
        .filter(
          (transaction: any) => transaction.TransactionType === "EscrowCreate"
        )
        .sort((a: any, b: any) => b.date - a.date);
      setEscrowData(escrowTransactions);
      //   console.log(escrowTransactions);
    }
  }, [transactionData]);

  const handleBorrow = (account: string, amount: number, hash: string) => {
    console.log(account);
    isInstalled().then((response) => {
      getAddress().then((response) => {
        console.log(response.result?.address);
        setAddressA(response.result?.address);
      });
      if (response.result.isInstalled && amount !== null && account !== null) {
        const payment = {
          amount: amount * 0.6,
          destination: account,
          memos: [
            {
              memo: {
                memoData: stringToHex(hash),
                memoType: "4465736372697074696F6E",
              },
            },
          ],
        };

        sendPayment(payment as any).then((response) => {
          console.log("Transaction Hash: ", response.result?.hash);
        });

        fetchTransactionsWithInterval(4); // Appelle 4 fois
      }
    });
  };

  return (
    <div className={styles.mainHome}>
      <div className={styles.leftHome}>
        <div>Ask to borrow</div>
        <div className={styles.divSideLeft}>
          <div>Create Escrow</div>
          <div>
            <label htmlFor="">Collateral</label>
            <input
              type="number"
              // value={collateral && collateral.toFixed(0)} // Utilise toFixed pour limiter les décimales
              value={
                typeof collateral === "number"
                  ? collateral.toFixed(0)
                  : collateral
              }
              placeholder="Add a collateral"
              onChange={handleCollateralChange}
            />
            <label htmlFor="">Amount available to borrow</label>
            <input
              type="number"
              placeholder="Add an amount available to borrow"
              value={typeof amount === "number" ? amount.toFixed(0) : amount}
              onChange={handleAmountChange}
            />
            <div>
              <div className={styles.apy}>APY: 4.32%</div>
              <button onClick={handleEscrow}>Create collateral</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightHome}>
        <div>Lend tokens</div>
        <div className={styles.divSideRight}>
          <div>Select Escrow</div>
          {escrowData ? (
            escrowData.map((e: any) => (
              <div className={styles.elemEscrow}>
                <div className={styles.infoElemEscrow}>
                  <div>
                    <div>Supplier:</div>
                    <div>Collateral:</div>
                    <div>Amount:</div>
                    <div>APY:</div>
                    <div>Exp. date:</div>
                  </div>
                  <div>
                    <div title={e.Account}>
                      {e.Account.substr(0, 4) +
                        "..." +
                        e.Account.substr(e.Account.length - 4)}
                    </div>
                    <div>{parseInt(e.Amount) / 1000000}</div>
                    <div>
                      {((parseInt(e.Amount) / 1000000) * 0.6).toFixed(1)}
                    </div>
                    <div>{"4.32%"}</div>
                    <div>{formatDate((e.CancelAfter + 946684800) * 1000)}</div>
                  </div>
                </div>
                <div className={styles.linkandborrow}>
                  <a
                    href={
                      "https://testnet.xrpl.org/transactions/" + e.hash + "/"
                    }
                    target="_blank"
                  >
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M13.7778 4H20.0001V10.2222"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M20 14.4328V18.6667C20 19.4031 19.4031 20 18.6667 20H5.33333C4.59696 20 4 19.4031 4 18.6667V5.33333C4 4.59696 4.59696 4 5.33333 4H9.33333"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M12.7998 11.2L19.5998 4.39996"
                        stroke="white"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </a>
                  <button
                    onClick={() => handleBorrow(e.Account, e.Amount, e.hash)}
                    style={{
                      opacity: e.Account == addressA ? "0.5" : "1",
                    }}
                  >
                    {e.Account == addressA ? "Remove" : "Lend"}
                  </button>
                </div>
              </div>
            ))
          ) : (
            <div>Fetching data...</div>
          )}
        </div>
      </div>
    </div>
  );
}
