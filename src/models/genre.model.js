import { DataTypes } from "sequelize";
import { sequelize } from '../config/database.js'

export const Genre = sequelize.define('genre', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    name: {
        type: DataTypes.STRING
    },
    image_url: {
        type: DataTypes.STRING
    }
})