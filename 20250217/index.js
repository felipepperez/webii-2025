const S = require('string');
const colors = require('colors');
const moment = require('moment');
const { JsonDB, Config } = require('node-json-db');
const db = new JsonDB(new Config("index", true, false, '/'));

console.log(S('paralelepipedo').count('le'));

console.log(S('paralelepipedo').contains('xpto'));

console.log(S('paralelepipedo').between('para', 'pipe').s);

console.log('Teste de cor'.bgGreen);

console.log('Zebra'.zebra);

console.log('Arco Iris'.rainbow);

const now = moment();
const tomorow = moment().add(1, 'day');
const yesterday = moment().subtract(1, 'day');
console.log(now.format(), tomorow.format(), tomorow.diff(now, 'hours'));

async function teste(){
    await db.push('/test1',"super test");
    await db.push('/test2/name/id',"Felipe");
    await db.push('/test3',{teste:{teste:['teste','teste']}});
    await db.delete('/test3/teste/teste');
    console.log(await db.getData('/test2/name'));
}
teste();