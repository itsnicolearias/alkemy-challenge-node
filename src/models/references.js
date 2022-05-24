import { sequelize } from "../config/database.js";
import { Characters } from "./characters.model.js";
import { Movies } from "./movies.model.js";
import { Genre } from "./genre.model.js";

Characters.hasMany(Movies, {
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
})

//
Movies.hasMany(Genre, {
    foreignKey: 'asociated_movies',
    sourceKey: 'id'
})
Genre.belongsTo(Movies, {
    foreignKey: 'asociated_movies',
    targetId: 'id'
})