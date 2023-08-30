import Image from "next/image";
import styles from "./page.module.css";
import React, { useState, useEffect } from "react";
import { isInstalled, sendPayment } from "@gemwallet/api";

export default function Home() {
    const [amount, setAmount] = useState('');
    const [destination, setDestination] = useState('');

    const handleSend = () => {
        isInstalled().then((response) => {
            if (response.result.isInstalled && amount !== null && destination !== null) {
                const payment = {
                    amount: { value: Number(amount) * 1000000, currency: 'XRP' },
                    destination: destination,
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
            <input type="number" value={amount} onChange={e => setAmount(e.target.value)} />
            <div>Destination</div>
            <input type="text" value={destination} onChange={e => setDestination(e.target.value)} />
            <button onClick={handleSend}>Send!</button>
        </div>
    );
}