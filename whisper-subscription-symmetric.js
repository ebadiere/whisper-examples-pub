#! /usr/bin/env node
const Web3 = require('web3')
const decodeFromHex = require('./lib/hexutils').decodeFromHex;

const poll = async () => {

    let args = process.argv.slice(2);
    console.log('args: ', args);
    const provider = new Web3.providers.WebsocketProvider(args[0]);

    let password  = args[1];
    
    let web3 = new Web3(provider);

    web3 = new Web3(provider);
    await web3.shh.getInfo().then(console.log);
    let version = await web3.shh.getVersion();
    console.log(`Version: ${version}`);

    await web3.shh.net.getPeerCount().then(console.log);

    let symKeyID = await web3.shh.generateSymKeyFromPassword(password);
   
    console.log(`keyID: ${symKeyID}`);
 
    web3.shh.subscribe("messages", {
        symKeyID: symKeyID,
        topics: ['0x07678231']
    }).on('data', (data)=>{
        let payload = data.payload;
        console.log(`data coded: ${data.payload}`);
        let payloadDecoded = decodeFromHex(data.payload);
        console.log(`data decoded: ${JSON.stringify(decodeFromHex(data.payload))}`);
    });        
}

poll();