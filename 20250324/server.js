const http = require('http');
const Websocket = require('ws');
const fs = require('fs');
const path = require('path');

const server = http.createServer((req, res) => {
    let filePath = path.join(__dirname, 'public', req.url === '/' ? 'index.html' : req.url);
    fs.readFile(filePath, (err, data) => {
        if (err) {
            res.writeHead(404);
            res.end('Arquivo não encontrado');
        } else {
            res.writeHead(200);
            res.end(data);
        }
    });
});

const wss = new Websocket.Server({ server });

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado!');
    ws.on('message', (message) => {
        console.log(`Mensagem recebida: ${message}`);

        wss.clients.forEach(client => {
            if (client.readyState === Websocket.OPEN) {
                client.send(message);
            }
        })
    })
    ws.on('close', () => {
        console.log('Cliente desconectado');
    })
})

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})