import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'

export const Movies = sequelize.define('movies', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING
    },
    title: {
        type: DataTypes.STRING
    },
    creation_date: {
        type: DataTypes.DATE
    },
    calification: {
        type: DataTypes.DECIMAL
    }
})