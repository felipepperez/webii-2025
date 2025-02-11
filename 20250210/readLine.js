const readline = require('readline');

const keyboard = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

keyboard.question('Entre com um dos lados do retângulo: ', (resp) => {
    const sideA = resp;
    keyboard.question('Entre com o outro lado do retângulo: ', (resp) => {
        const sideB = resp;
        console.log('Area do retângulo: ', sideA * sideB);
        keyboard.close();
    });
});