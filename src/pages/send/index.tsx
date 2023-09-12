import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { isInstalled, sendPayment } from "@gemwallet/api";
import { formatDate, hexToString, stringToHex } from "../functions";

export default function Home() {
    const [amount, setAmount] = useState(0);
    const [destination, setDestination] = useState("rN5HFmQURdbajXKTDYcTYotCn6zNWSy41");

    const handleSend = () => {
        isInstalled().then((response) => {
            if (response.result.isInstalled && amount !== null && destination !== null) {
                const payment = {
                    amount: amount * 1000000 ,
                    destination: destination,
                    memos: [
                        {
                          memo: {
                            memoData: stringToHex("Salluuuttttt"),
                            memoType: "4465736372697074696F6E",
                          },
                        },
                      ],
                };
                
                sendPayment(payment  as any).then((response) => {
                    console.log("Transaction Hash: ", response.result?.hash);
                });
            }
        });
    };

    return (
        <div>
            <div>Send</div>
            <div>Amount</div>
            <input type="number" value={amount || ''} onChange={e => setAmount(parseFloat(e.target.value))} />
            <div>Destination</div>
            <input type="text" value={destination} onChange={e => setDestination(e.target.value)} />
            <button onClick={handleSend}>Send!</button>
        </div>
    );
}