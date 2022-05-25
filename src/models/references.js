import { sequelize } from "../config/database.js";
import { Characters } from "./characters.model.js";
import { Movies } from "./movies.model.js";
import { DataTypes } from 'sequelize'


export const charactersMovies = sequelize.define('characters_movies', {
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movies, 
      key: 'id'
    }
  },
  CharacterId: {
    type: DataTypes.INTEGER,
    references: {
      model: Characters, 
      key: 'id'
    }
  }
});
