import Sequelize from 'sequelize'
import { envConfig } from './envConfig.js'

export const sequelize = new Sequelize(
    'disney-challenge',
    envConfig.db.user,
    envConfig.db.password,{
    host: 'localhost',
    dialect: 'postgres'
})