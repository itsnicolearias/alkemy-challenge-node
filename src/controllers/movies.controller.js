import { Movies } from "../models/movies.model.js"

export const getAllMovies = async(req, res) => {
    try {
        const movies = await Movies.findAll({
            attributes: ["image", "title", "creation_date"],
        });
        res.json({movies: movies})
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const getMovieById = async(req, res) => {
    const { id } = req.params;

    try {
        const movie = await Movies.findOne({
            where: {id}
        })
        res.json(movie)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const createMovie = async(req, res) => {

    const { image, title, creation_date, calification, asociated_characters} = req.body;
    try {
        const newMovie = await Movies.create({
            image,
            title,
            creation_date,
            calification,
            asociated_characters
        })
        res.json(newMovie)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const updateMovie = async(req, res) => {
    const { id } = req.params;

    try {
        const updatedMovie = await Movies.findOne({
            where: {id}
        })
        updatedMovie.set(req.body);
        await updatedMovie.save()

        res.json(updatedMovie)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const deleteMovie = async(req, res) => {
    const { id } = req.params;
    try {
       await Movies.destroy({
           where: {id}
       })  
       res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}