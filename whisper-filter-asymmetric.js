#! /usr/bin/env node
const Web3 = require('web3')
const decodeFromHex = require('./lib/hexutils').decodeFromHex;

const poll = async () => {
 
    let args = process.argv.slice(2);
    console.log('args: ', args);
    const provider = new Web3.providers.WebsocketProvider(args[0]);

    let id  = args[1];

    let keyID;
    let privateKey;
    let publicKey;
    let filterID;
    
    let web3 = new Web3(provider);
 
    web3 = new Web3(provider);
    await web3.shh.getInfo().then(console.log);
    let version = await web3.shh.getVersion();
    console.log(`Version: ${version}`);

    await web3.shh.net.getPeerCount().then(console.log);

    let filter = {
    };

    await web3.shh.newKeyPair().then((id) => {keyID = id;});
    console.log(`key: ${keyID}`);

    await web3.shh.getPrivateKey(keyID).then((id) => {privateKey = id;});
    console.log(`privateKey: ${privateKey}`);

    await web3.shh.getPublicKey(keyID).then((id) => {publicKey = id;});
    console.log(`publicKey: ${publicKey}`);  
    
    //    let topics = ['0x07678231'];
       let topics = ['0xdeadbeef'];

        //  let topics = ['0x07678231', '0xdeadbeef'];
    
    web3.shh.newMessageFilter({
        privateKeyID: keyID,
        topics: topics
    }).then(((filterId) => {
        console.log(`Filter ID: ${filterId}`);
        setInterval(() => {
            web3.shh.getFilterMessages(filterId).then(messages => {
                for (let msg of messages) {
                    let message = decodeFromHex(msg.payload);
                    console.log(`message: ${JSON.stringify(message)}`);                            
                }
            });
        }, 1);         
    })
);         

}

poll();