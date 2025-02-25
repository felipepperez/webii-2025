const { JsonDB, Config } = require('node-json-db');
const db = new JsonDB(new Config("index", true, false, '/'));
const { v4: uuidv4 } = require("uuid");


let database = {
    getAll: async () => {
        try {
            return { ...await db.getData('/users') };
        } catch (error) {
            return {};
        }
    },
    get: async (id) => {
        try {
            return await db.getData(`/users/${id}`);
        } catch (error) {
            return;
        }
    },
    create: async (user) => {
        const index = uuidv4();
        await db.push(`/users/${index}`, user);
        return index;
    },
    update: async (id, user) => {
        if (await database.get(id)) {
            await db.push(`/users/${id}`, user);
            return true;
        }
        return false;
    },
    delete: async (id) => {
        if (await database.get(id)) {
            await db.delete(`/users/${id}`);
            return true;
        }
        return false;
    }
}

module.exports = { database };