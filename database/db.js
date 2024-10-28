import { Sequelize } from 'sequelize';

const db = new Sequelize('discobar', 'root', '', {
    host: 'localhost',
    dialect: 'mysql' 
})

export default db