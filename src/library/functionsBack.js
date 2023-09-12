const axios = require('axios');

async function getAccountTx(address) {
    try {
        // const response = await axios.post('http://s1.ripple.com:51234/', {
        const response = await axios.post('https://s.altnet.rippletest.net:51234/', {
            method: 'account_tx',
            params: [{
                account: address ? address : 'rN5HFmQURdbajXKTDYcTYotCn6zNWSy41',
            }, ],
        });
        const transactions = response.data.result.transactions
            .filter(tx => tx.meta.TransactionResult == "tesSUCCESS")
            .map(tx => tx.tx); // Extract the "tx" part of each transaction
        // const transactions = response.data.result.transactions.map(tx => tx.tx);
        console.log(transactions);
        return transactions;

    } catch (error) {
        console.error(error);
    }
}

getAccountTx();



async function checkAPI(address) {
    let res = await getAccountTx(address);
    console.log("checkaccount")
    console.log(res)
    console.log("end res")
    return res;
}


module.exports = {
    checkAPI,
    getAccountTx
};