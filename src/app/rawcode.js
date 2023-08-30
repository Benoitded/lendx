const xrpl = require("xrpl");

async function test() {
    const client = new xrpl.Client("wss://s.altnet.rippletest.net:51233");
    await client.connect();
    console.log("connected");
    // const { wallet } = await client.fundWallet();

    const { wallet } = xrpl.Wallet.fromSeed("sEdT3SAAgnfcQvcnBGvDsFSUkFT18td");

    console.log(wallet);

    const tx = {
        TransactionType: "EscrowCancel",
        Account: wallet.address,
        Owner: "rN5HFmQURdbajXKTDYcTYotCn6zNWSy41",
        OfferSequence: 40704766,
    };

    const result = await client.submitAndWait(tx, { autofill: true, wallet });
    console.log(result.result);

    await client.disconnect();
}

test();