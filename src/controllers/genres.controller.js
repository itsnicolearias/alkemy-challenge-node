import { handleHttpError } from "../handlers/handleHttpError.js";
import { Genre } from "../models/genre.model.js";
import { uploadImage, deleteImage } from '../config/awsConfig.js'
import { envConfig } from '../config/envConfig.js'

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

    try {
        const name = req.body
        const newGenre = await Genre.create(name)

        const file = req.file
        if (file){
            const type = file.mimetype.split('/')[1]
            const key = newGenre.name + '.' + type
      
           await uploadImage(newGenre.name, file.buffer, type)
               newGenre.image_url = `https://${envConfig.aws.bucketName}.s3.${envConfig.aws.region}.amazonaws.com/${key}`
          }

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

        const file = req.file
        if (file){
            const type = file.mimetype.split('/')[1]
            const key = updatedGenre.name + '.' + type
      
           await uploadImage(updatedGenre.name, file.buffer, type)
              updatedGenre.image_url = `https://${envConfig.aws.bucketName}.s3.${envConfig.aws.region}.amazonaws.com/${key}`
          }

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