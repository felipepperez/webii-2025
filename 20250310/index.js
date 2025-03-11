const http = require("http");
const fs = require("fs");
const formidable = require("formidable");

const { database } = require("./module.json.db");

const dirPublic = __dirname + "/www/";

const server = http.createServer(async (req, res) => {
    console.log(req.url);
    if (req.url == "/login" && req.method.toLowerCase() === 'post') {
        let form = new formidable.Formidable({});

        let fields;
        let files;
        try {
            [fields, files] = await form.parse(req);
            const user = await database.getByUsernameAndPassword(fields.username, fields.password);
            if (user) {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write('<h1>Formuario enviado com sucesso!</h1>');
                res.write(`<pre>${JSON.stringify(user, null, 2)}</pre>`);
                res.end();
                return;
            }
        } catch (err) {
            res.end("Erro ao processar o formulário");
            return;
        }
    }

    res.write(fs.readFileSync(dirPublic + "login.html"));
    res.end();
})

server.on('listening', () => {
    console.log("Servidor escutando na porta 3000!");
})

server.listen(3000);