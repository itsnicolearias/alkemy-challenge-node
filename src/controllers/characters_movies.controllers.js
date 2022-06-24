import { handleHttpError } from "../handlers/handleHttpError.js";
import { charactersMovies } from "../models/references.js";


export const getAllReferences = async(req, res) => {
    try {
        const references = await charactersMovies.findAll()
        res.json(references)
    } catch (error) {
        handleHttpError(error, res)
    }
}

export const createReference  = async(req, res) => {

    const { MovieId, CharacterId } = req.body;
    try {
        const newReference = await charactersMovies.create({
            MovieId,
            CharacterId
        })
        res.json(newReference)
    } catch (error) {
        handleHttpError(error, res)
    }
}

export const deleteReference = async(req, res) => {
    const { id } = req.params;
    try {
        await charactersMovies.destroy({
            where: {id}
        })
        res.sendStatus(204)
    } catch (error) {
        handleHttpError(error, res)
    }
}