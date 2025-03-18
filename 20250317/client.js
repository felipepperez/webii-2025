const WebSocket = require('ws');
const readLine = require('readline');

const rl = readLine.createInterface({
    input: process.stdin,
    output: process.stdout
})

const client = new WebSocket('ws://192.168.100.116:8080');

client.on('open', () => {
    client.send(JSON.stringify({ name: 'Felipe Pereira Perez', color: 'america' }));

    requireMessage();
});

function requireMessage() {
    rl.question('Digite uma mensagem: ', (message) => {
        client.send(message);
        requireMessage();
    })
}