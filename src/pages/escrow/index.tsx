import Image from "next/image";
import styles from "./page.module.css";
import { isInstalled, sendPayment, submitTransaction } from "@gemwallet/api";

const release_date_unix = Math.floor( new Date("2023-08-30T14:53:00Z") / 1000 );
const release_date_ripple = release_date_unix - 946684800;

const transaction = {
    Account: "rN5HFmQURdbajXKTDYcTYotCn6zNWSy41",
    TransactionType: "EscrowCreate",
    Amount: "10000", //TODO
    Destination: "rHWUQGP3tWwMf5Jqi17h6Wmz4TFRNcew7c",
    CancelAfter: release_date_ripple+1,
    FinishAfter: release_date_ripple,
    Condition: "A0258020E3B0C44298FC1C149AFBF4C8996FB92427AE41E4649B934CA495991B7852B855810100",
    DestinationTag: 23480,
    SourceTag: 11747,
  };


export default function Home() {

    // JavaScript Date() is natively expressed in milliseconds; convert to seconds
console.log(release_date_ripple);
// 563846400

    const handleEscrow = () => {
        isInstalled().then((response) => {
            
            if (response.result.isInstalled) {
                submitTransaction({ transaction }).then((response) => {
                    console.log(response.result?.hash);
                  }).catch((error) => {
                    console.error("Transaction submission failed", error);
                  });
            }
        });
    };

    const handleCancel = () => {
        isInstalled().then((response) => {
            if (response.result.isInstalled) {
                const tx = {
                    TransactionType: "EscrowCancel",
                    Account: "rPYLcp7hsj1DbX5ERFigy1NEmJUMfhzxW3",
                    Owner: "rN5HFmQURdbajXKTDYcTYotCn6zNWSy41",
                    OfferSequence: 40704766,
                  };
                submitTransaction({ tx }).then((response) => {
                    console.log(response);
                    console.log(response.result?.hash);
                  }).catch((error) => {
                    console.error("Transaction submission failed", error);
                  });
            }
        });
    };

  return (
    <div>
      <div>Send</div>
      {/* <div>Amount</div> */}
      {/* <input type="number" name="" id="amount" />
      <div>Destination</div>
      <input type="text" name="" id="destination" /> */}
      <button onClick={handleEscrow}>Escrow</button>
      <button onClick={handleCancel}>Cancel</button>
    </div>
  );
}
