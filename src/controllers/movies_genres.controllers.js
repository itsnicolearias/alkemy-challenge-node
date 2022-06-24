import { MoviesGenres } from "../models/references.js";

export const getAllReferences = async(req, res) => {
    try {
        const references = await MoviesGenres.findAll()
        res.json(references)
    } catch (error) {
        handleHttpError(error, res)
    }
    
}

export const createReference = async(req, res) => {
    
    const { MovieId, GenreId } = req.body;
    try {
        const newReference = await MoviesGenres.create({
            MovieId,
            GenreId
        })
        res.json(newReference)
    } catch (error) {
        handleHttpError(error, res)
    }

}

export const deleteReference = async(req, res) => {
    
    const { id } = req.params;
    try {
        await MoviesGenres.destroy({
            where: {id}
        });
        res.sendStatus(204)
    } catch (error) {
        handleHttpError(error, res)
    }

}