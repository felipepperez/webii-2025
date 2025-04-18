const WebSocket = require('ws');

const colors = require('colors');

const server = new WebSocket.Server({ port: 8080 });

const connections = [];

function showMessage(name, message, color) {
    const coloredName = name[color] || name['rainbow'];

   return `${coloredName} diz: ${message}`;
}

server.on('connection', (ws) => {
    console.log('Uma nova conexão iniciou');

    ws.on('message', (message) => {
        const findedConnection = connections.find((connection) => connection.ws == ws);
        if (!findedConnection) {
            try {
                const user = JSON.parse(message.toString());
                connections.push({ ws, ...user });
            } catch (error) {
                connections.push({ ws, name: message.toString(), color: 'default' });
            }

        } else {
            const coloredMessage = showMessage(findedConnection.name, message.toString(), findedConnection.color);
            for(const connection of connections){
                if(connection.ws !== ws && connection.ws.readyState === WebSocket.OPEN){
                    ws.send(coloredMessage);
                }
            }
        }
    })
})