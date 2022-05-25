import { sequelize } from "../config/database.js";
import { Characters } from "./characters.model.js";
import { Movies } from "./movies.model.js";
import { Genre } from "./genre.model.js";

/*Characters.hasMany(Movies, {
    foreignKey: 'asociated_characters',
    sourceKey: 'id'
})

Movies.belongsTo(Characters, {
    foreignKey: 'asociated_characters',
    targetId: 'id'
})

//
Movies.hasMany(Characters, {
    foreignKey: 'asociated_movies',
    sourceKey: 'id'
})
Characters.belongsTo(Movies, {
    foreignKey: 'asociated_movies',
    targetId: 'id'
})*/

//
Movies.hasMany(Genre, {
    foreignKey: 'asociated_movies',
    sourceKey: 'id'
})
Genre.belongsTo(Movies, {
    foreignKey: 'asociated_movies',
    targetId: 'id'
})
//esto crea una nueva tabla en la base de datos
//un personaje pertence a muchas peliculas
Characters.belongsToMany(Movies, { through: "character_movie"})

//una pelicula tiene muchos personajes
Movies.belongsToMany(Characters, { through: "character_movie"})

/*
//una pelicula tiene muchos generos
Movies.belongsToMany(Genre, { through: "character_movie"})

//un genero tiene muchas peliculas
Genre.belongsToMany(Movies, { through: "character_movie"})*/