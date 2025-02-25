const { database } = require("./module.json.db");

const chamada = async () => {
    const users = await database.getAll();
    console.log(users);
    const keys = Object.keys(users);
    const firstUserKey = keys[0];
    const lastUserKey = keys[keys.length - 1];
    console.log(firstUserKey);
    console.log(lastUserKey);
    console.log(await database.get(firstUserKey));
    console.log(await database.create({ name: "Felipe", email: "felipe.perez@unigran.br" }))
    console.log(await database.update("1215", { name: "Felipe", email: "felipe.perez@unigran.br" }))
    console.log(await database.update(firstUserKey, { name: "Felipe Perez", email: "felipe.perez@unigran.br" }))
    console.log(await database.delete("1215"))
    console.log(await database.get(lastUserKey));
    console.log(await database.delete(lastUserKey))
    console.log(await database.get(lastUserKey));
}

chamada();