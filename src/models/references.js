import { sequelize } from "../config/database.js";
import { Characters } from "./characters.model.js";
import { Movies } from "./movies.model.js";
import { DataTypes } from 'sequelize'
import { Genre } from "./genre.model.js";


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

export const MoviesGenres = sequelize.define('movies_genres', {
  
  MovieId: {
    type: DataTypes.INTEGER,
    references: {
      model: Movies,
      key: 'id'
    }
  },
  GenreId: {
    type: DataTypes.INTEGER,
    references: {
      model: Genre,
      key: 'id'
    }
  }
})