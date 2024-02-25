const __etherlab = require('etherlab-nodejs')

//cstruct2json -o ./slave.json -t4 -vv
const config = './slave.json'
// const config = './config/slaves.config.json'
const frequency = 2000 //in Hertz

const ecat = new __etherlab(config, frequency)

//Box Lamp
const output  = [
    //[position slave, index, subindex]
    [ 1, 0x7000, 0x01], //Green
    [ 1, 0x7010, 0x01], //Red
    [ 1, 0x7020, 0x01], //Red
    [ 1, 0x7030, 0x01], //Red
    [ 1, 0x7040, 0x01], //Red
    [ 1, 0x7050, 0x01], //Red
    [ 1, 0x7060, 0x01], //Red
    [ 1, 0x7070, 0x01], //Red
];

function sleep(ms){
	return new Promise(resolve => setTimeout(resolve, ms));
}

let isReady = false;
//Program Ready

ecat.on('ready', async rec => {
    for (let ch = 0; ch < output.length; ch++) {
        ecat.write(output[ch][0], output[ch][1], output[ch][2], 1);
        console.log(`write index ${output[ch][1].toString(16)} done...`)
        await new Promise(r => setTimeout(r, 1000))
    }
    
    for(let ch1 = 7; ch = output.length ; ch1--){
        ecat.write(output[ch1][0], output[ch1][1], output[ch1][2], 0);
        console.log(`write index ${output[ch1][1].toString(16)} close...`)
        await new Promise(r => setTimeout(r, 1000))
        if(ch1 == 0){
            break;
        }
    }
    isReady = true;
    console.log("write success")
    ecat.stop();
});

ecat.start();