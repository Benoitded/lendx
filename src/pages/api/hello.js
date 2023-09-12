require('dotenv').config();

const path = require('path');
const express = require("express");
const cors = require('cors');
const { checkAPI } = require("../../library/functionsBack");

// const { supabase, startServer } = require('./services/initServices');

const app = express();

const DEFAULT_ADDRESS = "r4FYvHu7KiHHTCWSAqNJ5Xb96Ci4CMcATF";


export default function handler(req, res) {
    res.status(200).json({ text: 'Hello' });
}

const whitelist = ["http://localhost:3000", "http://192.168.1.64:3000", "https://lendx-rouge.vercel.app/"]
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
        const data = await checkAPI(DEFAULT_ADDRESS);
        res.status(200);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error.message });
    }
});

app.get("/transactions/:address", async(req, res) => {
    try {
        // Récupérez l'adresse à partir des paramètres de la requête
        const address = req.params.address;
        const data = await checkAPI(address);
        res.status(200);
        res.json(data);
    } catch (error) {
        console.error(error);
        res.status(500);
        res.json({ error: error.message });
    }
});

startServer();