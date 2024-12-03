import { Sequelize } from 'sequelize';

const db = new Sequelize('eclipsenigth', 'root', '', {
    host: 'localhost',
    dialect: 'mysql',
})

export default db