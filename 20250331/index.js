const http = require('http');
const url = require('url');
const https = require('https');

const API_URL = "https://wttr.in";

const server = http.createServer((req, res) => {
    const parsedUrl = url.parse(req.url, true);
    console.log('method', req.method);
    console.log('parsedUrl.pathname', parsedUrl.pathname);
    if (req.method === "GET" && parsedUrl.pathname === '/formulario') {
        res.writeHead(200, { 'content-type': 'text/html; charset=utf-8' });
        res.end(`
            <html>
                <body>
                    <h1>Escolha a cidade para ver a previsão do tempo</h1>
                    <form action="/previsao" method="get">
                        <input type="text" name="cidade">
                        <button type="submit">Ver previsão</button>
                    </form>
                </body>
            </html>
            `);
    } else if (req.method === "GET" && parsedUrl.pathname === '/previsao') {
        console.log('query', parsedUrl.query);
        const cidade = parsedUrl.query.cidade;
        if (!cidade) {
            res.writeHead(400, { 'content-type': 'text/plain; charset=utf-8' });
            res.end("Por favor, forneça o nome da cidade");
            return
        }
        const apiUrl = `${API_URL}/${encodeURIComponent(cidade)}?format=3`;

        https.get(apiUrl, (apiRes) => {
            let data = '';
            apiRes.on('data', chunk => { data += chunk });
            apiRes.on('end', () => {
                if (!data.trim()) {
                    res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
                    res.end("Cidade não encontrada");
                    return;
                }
                res.writeHead(200, { 'content-type': 'text/plain; charset=utf-8' });
                res.end(data);
            })
        }).on('error',()=>{
            res.writeHead(500, { 'content-type': 'text/plain; charset=utf-8' });
            res.end('Erro ao buscar a previsão do tempo');
        })
    } else {
        res.writeHead(404, { 'content-type': 'text/plain; charset=utf-8' });
        res.end("Página não encontrada");
    }
});

server.listen(3000, () => {
    console.log('Servidor rodando em http://localhost:3000');
})