import { sequelize } from "../config/database.js";
import { DataTypes } from 'sequelize'

export const User = sequelize.define('users', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    age: {
        type: DataTypes.INTEGER
    },
    email: {
        type: DataTypes.STRING
    },
    password: {
        type: DataTypes.STRING
    }
})