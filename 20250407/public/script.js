let socket;
let attempts = [];

const statusSpan = document.querySelector('.status');
const infoForm = document.getElementById('infoForm');
const guessForm = document.getElementById('guessForm');
const messagesDiv = document.getElementById('messages');
const resultDiv = document.getElementById('result');

function setStatus(connected) {
    statusSpan.textContent = connected ? 'Conectado' : 'Desconectado';
    statusSpan.className = connected ? 'status connected' : 'status disconnected';
}

function connect() {
    const IP = 'localhost';
    socket = new WebSocket(`ws://${IP}:8080`);

    socket.addEventListener('open', () => {
        setStatus(true);
    });
    socket.addEventListener('close', () => {
        setStatus(false);

        setTimeout(() => {
            console.log('Tentando reconectar...');
            connect();
        }, 3000);
    });

    socket.addEventListener('message', event => {
        const data = JSON.parse(event.data);
        console.log(data);
        if (data.type == "success" && data.message == "Conexão bem-sucedida!") {
            console.log('teste');
            infoForm.style.display = "none";
            guessForm.style.display = "block";
        } else if (data.type == "hint") {
            addMessage("Dica:  é " + data.message + " que " + attempts[attempts.length - 1] );
        } else if(data.type == "success" && data.secretNumber){
            resultDiv.innerHTML = `Você acertou o número secreto (${data.secretNumber}). Em ${attempts.length} tentativas.`
        }
    })
}

function addMessage(msg) {
    const p = document.createElement('p');
    p.textContent = msg;
    messagesDiv.appendChild(p);
}

infoForm.addEventListener('submit', e => {
    e.preventDefault();
    const name = document.getElementById('name').value;
    const rgm = document.getElementById('rgm').value;
    const msg = { type: "info", name, rgm };
    socket.send(JSON.stringify(msg));
});

guessForm.addEventListener('submit', e => {
    e.preventDefault();
    const number = parseInt(document.getElementById('guess').value);

    if (!isNaN(number)) {
        attempts.push(number);
        const msg = { type: 'guess', number };
        socket.send(JSON.stringify(msg));
        document.getElementById('guess').value = '';
    } else {
        addMessage("Número inválido!");
    }
});

connect();