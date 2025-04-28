const WebSocket = require('ws');
const http = require('http');
const fs = require('fs');

// Criar servidor HTTP para o WebSocket
const server = http.createServer();
const wss = new WebSocket.Server({ server });

// Armazenamento dos dados dos alunos
let studentsData = {};

// Função para salvar dados em um arquivo JSON
function saveDataToFile() {
    fs.writeFileSync('studentsData.json', JSON.stringify(studentsData, null, 2));
}

// Função para carregar dados do arquivo JSON
function loadDataFromFile() {
    if (fs.existsSync('studentsData.json')) {
        const data = fs.readFileSync('studentsData.json', 'utf8');
        studentsData = JSON.parse(data);
    }
}

// Carregar dados ao iniciar o servidor
loadDataFromFile();

wss.on('connection', (ws) => {
    console.log('Novo cliente conectado.');

    let secretNumber;
    let attempts = [];
    let studentName, studentRGM;

    // Solicitar nome e RGM ao cliente
    ws.send(JSON.stringify({ type: 'request-info', message: 'Por favor, forneça seu nome e RGM.' }));

    ws.on('message', (message) => {
        try {
            const data = JSON.parse(message);

            // Verificar se o tipo da mensagem é "info" (nome e RGM)
            if (data.type === 'info') {
                // Validar nome e RGM
                if (!data.name || !data.rgm || typeof data.name !== 'string' || typeof data.rgm !== 'string') {
                    ws.send(JSON.stringify({ type: 'error', message: 'Nome e RGM são obrigatórios e devem ser strings válidas.' }));
                    return;
                }

                studentName = data.name.trim();
                studentRGM = data.rgm.trim();

                // Verificar se o nome e RGM não estão vazios
                if (!studentName || !studentRGM) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Nome e RGM não podem estar vazios.' }));
                    return;
                }

                console.log(`Aluno conectado: ${studentName}, RGM: ${studentRGM}`);
                ws.send(JSON.stringify({ type: 'success', message: 'Conexão bem-sucedida!' }));

                // Gerar número secreto
                secretNumber = Math.floor(Math.random() * 1000000);
                attempts = [];
                studentsData[studentRGM] = { name: studentName, secretNumber, attempts };
                saveDataToFile();

            } else if (data.type === 'guess') {
                // Validar se o aluno já enviou nome e RGM
                if (!studentName || !studentRGM) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Envie seu nome e RGM antes de tentar adivinhar.' }));
                    return;
                }

                // Validar se o número foi enviado e é um número válido
                if (typeof data.number !== 'number' || isNaN(data.number)) {
                    ws.send(JSON.stringify({ type: 'error', message: 'Envio obrigatório de um número válido.' }));
                    return;
                }

                const guess = data.number;

                // Adicionar tentativa ao histórico
                attempts.push(guess);
                studentsData[studentRGM].attempts = attempts;
                saveDataToFile();

                // Comparar o palpite com o número secreto
                if (guess === secretNumber) {
                    ws.send(JSON.stringify({
                        type: 'success',
                        message: 'Você acertou!',
                        secretNumber,
                        attempts
                    }));

                    // Exibir no terminal que o aluno concluiu o desafio
                    console.log(`Desafio concluído por: ${studentName} (RGM: ${studentRGM})`);
                    console.log(`Número secreto: ${secretNumber}`);
                    console.log(`Tentativas: ${attempts.length}`);

                } else if (guess < secretNumber) {
                    ws.send(JSON.stringify({ type: 'hint', message: 'Maior' }));
                } else {
                    ws.send(JSON.stringify({ type: 'hint', message: 'Menor' }));
                }

            } else {
                // Mensagem inválida recebida
                ws.send(JSON.stringify({ type: 'error', message: 'Tipo de mensagem inválido.' }));
            }
        } catch (error) {
            // Tratar erros de parsing ou outros erros inesperados
            console.error('Erro ao processar mensagem:', error.message);
            ws.send(JSON.stringify({ type: 'error', message: 'Erro ao processar sua solicitação. Verifique o formato da mensagem.' }));
        }
    });

    ws.on('close', () => {
        console.log('Cliente desconectado.');
    });
});

server.listen(8080, () => {
    console.log('Servidor WebSocket rodando na porta 8080.');
    console.log('Os alunos devem se conectar usando o endereço: ws://[SEU_IP]:8080');
});