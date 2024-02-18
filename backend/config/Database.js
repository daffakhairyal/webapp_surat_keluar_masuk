import Sequelize from "sequelize";

const db = new Sequelize('dashboard', 'user', 'Dd@14170077', {
    host: "192.168.1.9",
    dialect: "mysql",
});

export default db;
