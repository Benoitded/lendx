import Image from "next/image";
import styles from "./page.module.scss";

// });

const dataEscrows = [
  {
    supplier: "rN5HFmQURdbajXKTDYcTYotCn6zNWSy41",
    amount: 2000,
    collateral: 1200,
    apy: 7.32,
    expiration_date: "2023-08-30T14:53:00Z",
  },
  {
    supplier: "aBcDeFgHiJkLmNoPqRsTuVwXyZ1",
    amount: 1500,
    collateral: 900,
    apy: 6.85,
    expiration_date: "2023-09-15T10:00:00Z",
  },
  {
    supplier: "xYz1234567890AbCdEfGhIjKlMnOpQrS",
    amount: 3000,
    collateral: 1800,
    apy: 8.21,
    expiration_date: "2023-10-03T16:22:00Z",
  },
  {
    supplier: "pQrStUvWxYz9876543210NlMkJhIgFeDcB",
    amount: 2500,
    collateral: 1500,
    apy: 7.96,
    expiration_date: "2023-11-18T08:45:00Z",
  },
];

export default function Home() {
  return (
    <div className={styles.mainHome}>
      <div className={styles.leftHome}>
        <div>Supply your tokens</div>
        <div className={styles.divSideLeft}>
          <div>Create Escrow</div>
          <div>
            <label htmlFor="">Amount</label>
            <input type="number" />
            <label htmlFor="">Collateral</label>
            <input type="number" />
            <div>
              <div className={styles.apy}>APY: 4.32%</div>
              <button>Create escrow</button>
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
                  <div>Amount:</div>
                  <div>Collateral:</div>
                  <div>APY:</div>
                  <div>Exp. date:</div>
                </div>
                <div>
                  <div title={e.supplier}>
                    {e.supplier.substr(0, 4) +
                      "..." +
                      e.supplier.substr(e.supplier.length - 4)}
                  </div>
                  <div>{e.amount}</div>
                  <div>{e.collateral}</div>
                  <div>{e.apy}</div>
                  <div>{e.expiration_date}</div>
                </div>
              </div>
              <button>Click</button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
