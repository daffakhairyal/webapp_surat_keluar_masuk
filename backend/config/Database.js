import {Sequelize} from "sequelize";

const db = new Sequelize('dashboard','root','',{
    host:"localhost",
    dialect:"mysql"
});

export default db