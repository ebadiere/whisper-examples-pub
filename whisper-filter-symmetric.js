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

    let filter = {
    };

    let symKeyID = await web3.shh.generateSymKeyFromPassword(password);;
    console.log(`symKeyID: ${symKeyID}`);
 
    filter.symKeyID = symKeyID;
    filter.topics = ['0x07678231'];

    web3.shh.newMessageFilter(filter).then(((filterId) => {
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