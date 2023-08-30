const axios = require('axios');

async function getAccountTx() {
    try {
        // const response = await axios.post('http://s1.ripple.com:51234/', {
        const response = await axios.post('https://s.altnet.rippletest.net:51234/', {
            method: 'account_tx',
            params: [{
                account: 'rN5HFmQURdbajXKTDYcTYotCn6zNWSy41',
            }, ],
        });
        // console.log(response.data);
        return response.data.result.transactions;
    } catch (error) {
        console.error(error);
    }
}

getAccountTx();



async function checkAPI(address) {
    let res = await getAccountTx();
    console.log("checkaccount")
    console.log(res)
    console.log("end res")
    return res;
}


module.exports = {
    checkAPI,
    getAccountTx
};