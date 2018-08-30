#! /usr/bin/env node
const Web3 = require('web3')
const encodeToHex = require('./lib/hexutils').encodeToHex;

const post = async () => {

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

    let symKeyID = await web3.shh.generateSymKeyFromPassword(password);;
    console.log(`symKeyID: ${symKeyID}`);

    let msg = {
        text: 'Some awesome message',
        name: 'John Smith'
    };

    await web3.shh.post({
        symKeyID: symKeyID,
        ttl: 100,
        topic: '0x07678231',
        payload: encodeToHex(JSON.stringify(msg)),
        powTime: 8,
        powTarget: 10.01
    }).then(h => {
        console.log(`Message: ${JSON.stringify(msg)} with hash ${h} was successfuly sent`);
        web3.currentProvider.connection.close();
    })
    .catch(err => console.log("Error: ", err));
}

post();
         