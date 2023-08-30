// const express = require("express");
// const axios = require("axios");
require('dotenv').config();

const path = require('path');
const express = require("express");
const cors = require('cors');
const { checkAPI, getAccountTx } = require("./functions");

// const { supabase, startServer } = require('./services/initServices');

const app = express();
const port = 8000;

const whitelist = ["http://localhost:3000", "http://192.168.1.64:3000", ]
const corsOptions = {
    origin: function(origin, callback) {
        if (!origin || whitelist.indexOf(origin) !== -1) {
            callback(null, true)
        } else {
            callback(new Error("Not allowed by CORS"))
        }
    },
    credentials: true,
}
app.use(cors(corsOptions))

const startServer = async() => {
    app.listen(port, () => {
        console.log(`Example app listening on port ${port}`);
    });
};

app.get("/", (req, res) => {
    res.send("Hello World!!");
});

app.get("/transactions", async(req, res) => {
    try {
        // const data = await transactionsService.getTransactions(DEFAULT_ADDRESS);
        const data = await checkAPI.checkAPI();
        res.status(200);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error.message });
    }
});

function boucle() {
    setInterval(() => {
        console.log("salut");
        let res = getAccountTx();
        for (r of res) {
            let account = r.tx.Account;
            if (account == "rHWUQGP3tWwMf5Jqi17h6Wmz4TFRNcew7c") //TODO
            {
                if (r.tx.Amount == 1000000) {
                    console.log("ok");
                    //TODO
                }
            }
        }
    }, 20000); // répète toutes les 1000 ms, soit 1 seconde
}
boucle()
startServer();
// checkAPI.checkAPI();
// transactionsService.getTransactions(DEFAULT_ADDRESS);
// transactionsService.getBalancesForAllChains(DEFAULT_ADDRESS, chains);
// transactionsService.getFullHistory(DEFAULT_ADDRESS, chain);