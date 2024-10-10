import { Sequelize } from 'sequelize';


const db = new Sequelize('bardisco', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' 
})

export default db