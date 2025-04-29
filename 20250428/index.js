const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get('/', (req, res) => {
    res.redirect('/index.html');
})

app.post('/form', (req, res) => {
    const { username, password } = req.body;
    if ((!username || !password) || username != "felipe" && password != "perez") {
        res.redirect('/index.html');
        return;
    }
    res.sendFile(path.join(__dirname, 'private', 'index.html'));
});

app.get('/exemplo/:type', (req, res) => {
    res.send(req.params.type);
});

app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("O servidor está escutando na porta 3000.");
});