let car1 = {
    modelo: 'Argo',
    marca: 'Fiat',
    info: function () {
        console.log(`${this.marca} ${this.modelo}`);
    }
}

let car2 = {
    modelo: 'Argo',
    marca: 'Fiat',
    info: function () {
        console.log(`${this.marca} ${this.modelo}`);
    }
}

let acesso = false;

module.exports = { car1, car2 };