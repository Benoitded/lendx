import Image from "next/image";
import styles from "./page.module.css";
import { isInstalled, sendPayment } from "@gemwallet/api";

const payload = {
    amount: "1000000", // In drops (1 XRP)
    destination: "rLWQskMM8EoPxaLsmuQxE5rYeP4uX7dhym",
    memos: [
      {
        memo: {
          memoType: "4465736372697074696f6e",
          memoData: "54657374206d656d6f",
        },
      },
    ],
    destinationTag: 12,
    fee: "199",
    flags: {
      tfNoDirectRipple: false,
      tfPartialPayment: false,
      tfLimitQuality: false,
    },
  };

// });
export default function Home() {

    const handleSend = () => {
        isInstalled().then((response) => {
            const amount = document.querySelector("#amount").value || null;
            const destination = document.querySelector("#destination").value;
            
            if (response.result.isInstalled) {
            const payment = {
                amount: amount * 1000000, // In drops (1 XRP)
                destination: destination,
            };
            sendPayment(payment).then((response) => {
                console.log("Transaction Hash: ", response.result?.hash);
            });
            }
        });
    };

  return (
    <div>
      <div>Send</div>
      <div>Amount</div>
      <input type="number" name="" id="amount" />
      <div>Destination</div>
      <input type="text" name="" id="destination" />
      <button onClick={handleSend}>Send!</button>
    </div>
  );
}
