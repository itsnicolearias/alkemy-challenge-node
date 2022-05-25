import { charactersMovies } from "../models/references.js";


export const getAllReferences = async(req, res) => {
    try {
        const references = await charactersMovies.findAll()
        res.json(references)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
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
         res.status(500).json({
            message: error.message,
          });
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
        res.status(500).json({
            message: error.message,
          });
    }
}