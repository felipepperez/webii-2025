const http = require("http");
const colors = require("colors");
const fs = require('fs');


const myUrl = new URL('https://user:pass@sub.example.com:8080/p/a/t/h?query=string&query2=teste#hash');
console.log(myUrl);

const server = http.createServer((req, res) => {
    console.log('request.method='.yellow, req.method);
    console.log('request.url='.yellow, req.url);
    var diretorio = __dirname;
    if (req.url == "/json") {
        res.writeHead(200, { 'content-type': 'application/json' });
        const obj = {
            "7ba0647f-2fb2-4087-af31-22b0ccf9f121": {
                "name": "Felipe",
                "email": "felipe.perez@unigran.br"
            },
            "1b48dd8c-b7a9-4af0-abbc-59cb1622bde1": {
                "name": "Felipe",
                "email": "felipe.perez@unigran.br"
            },
            "a180eb3a-a11e-4c7f-9c50-c12dee5769e5": {
                "name": "Felipe",
                "email": "felipe.perez@unigran.br"
            }
        };
        res.write(JSON.stringify(obj));
        res.end();
        return;
    } else if (req.url == "/favicon.ico") {
        res.write(fs.readFileSync(diretorio + '/favicon.ico'));
        res.end();
        return;
    }

    const myUrl = new URL('http://localhos:3000'+req.url);
    console.log(myUrl.pathname);
    try {
        const file = fs.readFileSync(diretorio+'/www'+myUrl.pathname);
        res.write(file);
        res.end();
        return;
    } catch (error) {
        
    }

    res.write(fs.readFileSync(diretorio + '/index.html'));
    res.end();
});

server.listen(3000);
console.log("Servidor escutando na porta 3000!");