import { handleHttpError } from "../handlers/handleHttpError.js";
import { Genre } from "../models/genre.model.js";

export const getAllGenres = async(req, res) => {
    try {
        const genres = await Genre.findAll()
        res.json(genres)
    } catch (error) {
        handleHttpError(error, res)
    }
}

export const getGenreById = async(req, res) => {
    const { id } = req.params
    try {
        const genre = await Genre.findOne({
            where: { id }
        })
        res.json(genre)
    } catch (error) {
        handleHttpError(error, res)
    }
}

export const createGenre = async(req, res) => {

    const { name, image, asociated_movies } = req.body;
    try {
        const newGenre = await Genre.create({
            name,
            image,
            asociated_movies
        })
        res.json(newGenre)
    } catch (error) {
        handleHttpError(error, res)
    }
}

export const updateGenre = async(req, res) => {

    const { id } = req.params
    try {
        const updatedGenre = await Genre.findOne({
            where: {id}
        })
        updatedGenre.set(req.body)
        await updatedGenre.save()

        res.json(updatedGenre)
    } catch (error) {
        handleHttpError(error, res)
    }
}

export const deleteGenre = async(req, res) => {

    const { id } = req.params;
    try {
        await Genre.destroy({
            where: { id }
        })
        res.sendStatus(204)
    } catch (error) {
        handleHttpError(error, res)
    }
}