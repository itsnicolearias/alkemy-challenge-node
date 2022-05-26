import Sequelize from 'sequelize'
import { enviromentConfig } from './enviromentConfig.js'

export const sequelize = new Sequelize(
    'disney-challenge',
    enviromentConfig.db.user,
    enviromentConfig.db.password,{
    host: 'localhost',
    dialect: 'postgres'
})