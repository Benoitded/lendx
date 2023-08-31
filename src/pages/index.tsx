import Image from "next/image";
import styles from "./page.module.scss";
import { isInstalled, sendPayment, submitTransaction } from "@gemwallet/api";
import React, { useState, useEffect } from "react";

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

const dataEscrows = [
  {
    supplier: "rN5HFmQURdbajXKTDYcTYotCn6zNWSy41",
    amount: 2000,
    collateral: 1200,
    apy: 7.32,
    expiration_date: "2023-08-30T14:53:00Z",
    hash: "F02370A1F55E20A4FFDA5E8C5A04A24E62DB3C1D472CE8E7707511C0AB6545B3",
  },
  {
    supplier: "aBcDeFgHiJkLmNoPqRsTuVwXyZ1",
    amount: 1500,
    collateral: 900,
    apy: 6.85,
    expiration_date: "2023-09-15T10:00:00Z",
    hash: "F02370A1F55E20A4FFDA5E8C5A04A24E62DB3C1D472CE8E7707511C0AB6545B3",
  },
  {
    supplier: "xYz1234567890AbCdEfGhIjKlMnOpQrS",
    amount: 3000,
    collateral: 1800,
    apy: 8.21,
    expiration_date: "2023-10-03T16:22:00Z",
    hash: "F02370A1F55E20A4FFDA5E8C5A04A24E62DB3C1D472CE8E7707511C0AB6545B3",
  },
  {
    supplier: "pQrStUvWxYz9876543210NlMkJhIgFeDcB",
    amount: 2500,
    collateral: 1500,
    apy: 7.96,
    expiration_date: "2023-11-18T08:45:00Z",
    hash: "F02370A1F55E20A4FFDA5E8C5A04A24E62DB3C1D472CE8E7707511C0AB6545B3",
  },
];

const formatDate = (inputDate: string): string => {
  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const date = new Date(inputDate);
  const day = date.getUTCDate();
  const month = months[date.getUTCMonth()];
  const year = date.getUTCFullYear();
  const hours = (date.getUTCHours() < 10 ? "0" : "") + date.getUTCHours();
  const minutes = (date.getUTCMinutes() < 10 ? "0" : "") + date.getUTCMinutes();

  return `${day} ${month} ${year}, ${hours}:${minutes}`;
};

const release_date_unix = Math.floor(
  new Date("2023-08-31T14:53:00Z").getTime() / 1000
);
const release_date_ripple = release_date_unix - 946684800;

export default function Home() {
  const [amount, setAmount] = useState<number>(); // État pour gérer la valeur "amount"
  const [collateral, setCollateral] = useState<number>(); // État pour gérer la valeur "collateral"
  const [transactionData, setTransactionData] = useState<any>(null);

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

  const handleEscrow = () => {
    isInstalled().then((response) => {
      if (response.result.isInstalled) {
        console.log(amount ? amount.toString() : "0");
        const transaction: Transaction = {
          Account: "rN5HFmQURdbajXKTDYcTYotCn6zNWSy41",
          TransactionType: "EscrowCreate",
          Amount: amount ? (1000000 * amount).toString() : "0", // Utilise amount s'il est défini, sinon "0"
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
          .catch((error) => {
            console.error("Transaction submission failed", error);
          });
      }
    });
  };

  useEffect(() => {
    fetch(
      "http://localhost:8000/transactions/" //rPYLcp7hsj1DbX5ERFigy1NEmJUMfhzxW3
    )
      .then((response) => {
        if (response.ok) {
          return response.json();
        } else {
          console.error("Failed to fetch data:", response.statusText);
        }
      })
      .then((data) => {
        console.log(data);
      })
      .catch((error) => {
        console.log(
          "There was a problem with the fetch operation:",
          error.message
        );
      });
  }, []);

  return (
    <div className={styles.mainHome}>
      <div className={styles.leftHome}>
        <div>Supply your tokens</div>
        <div className={styles.divSideLeft}>
          <div>Create Escrow</div>
          <div>
            <label htmlFor="">Collateral</label>
            <input
              type="number"
              value={collateral && collateral.toFixed(1)} // Utilise toFixed pour limiter les décimales
              placeholder="Add a collateral"
              onChange={handleCollateralChange}
            />
            <label htmlFor="">Amount available to borrow</label>
            <input
              type="number"
              placeholder="Add an amount available to borrow"
              value={amount && amount.toFixed(1)}
              onChange={handleAmountChange}
            />
            <div>
              <div className={styles.apy}>APY: 4.32%</div>
              <button onClick={handleEscrow}>Create escrow</button>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.rightHome}>
        <div>Borrow tokens</div>
        <div className={styles.divSideRight}>
          <div>Select Escrow</div>
          {dataEscrows.map((e) => (
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
                  <div title={e.supplier}>
                    {e.supplier.substr(0, 4) +
                      "..." +
                      e.supplier.substr(e.supplier.length - 4)}
                  </div>
                  <div>{e.collateral}</div>
                  <div>{e.collateral * 0.6}</div>
                  <div>{e.apy}</div>
                  <div>{formatDate(e.expiration_date)}</div>
                </div>
              </div>
              <div className={styles.linkandborrow}>
                <a
                  href={"https://testnet.xrpl.org/transactions/" + e.hash + "/"}
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
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M20 14.4328V18.6667C20 19.4031 19.4031 20 18.6667 20H5.33333C4.59696 20 4 19.4031 4 18.6667V5.33333C4 4.59696 4.59696 4 5.33333 4H9.33333"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                    <path
                      d="M12.7998 11.2L19.5998 4.39996"
                      stroke="white"
                      stroke-width="2"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                </a>
                <button>Borrow</button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
