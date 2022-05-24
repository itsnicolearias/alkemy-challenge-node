import { DataTypes } from 'sequelize';
import { sequelize } from '../config/database.js'
import { Movies } from './movies.model.js';

export const Characters = sequelize.define('characters', {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true
    },
    image: {
        type: DataTypes.STRING
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    weight: {
        type: DataTypes.INTEGER
    },
    history: {
        type: DataTypes.TEXT
    }
})

//references
