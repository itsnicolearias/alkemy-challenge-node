import { Movies } from "../models/movies.model.js";
import { charactersMovies } from "../models/references.js";
import { Op } from "sequelize";
import { MoviesGenres } from "../models/references.js";
import { handleHttpError } from "../handlers/handleHttpError.js";
import { deleteImage, uploadImage } from "../config/awsConfig.js";
import { envConfig } from "../config/envConfig.js";

export const getAllMovies = async (req, res) => {
  const { name, genre, order } = req.query;

  try {
    if (name) {
      const moviesByName = await Movies.findAll({
        where: {
          title: { [Op.iLike]: '%'+name+'%' }
            },
         
        attributes: ["image_url", "title", "creation_date"],
      });
      return res.json(moviesByName);
    }

    if (order) {
      const moviesByOrder = await Movies.findAll({
        order: [["creation_date", order]],
        attributes: ["image_url", "title", "creation_date"],
      });
      return res.json(moviesByOrder);
    }

    if (genre) {
      const moviesByGenre = await MoviesGenres.findAll({
        where: { GenreId: genre },
        attributes: ["GenreId", "MovieId"],
      });
      res.json(moviesByGenre);
    }

    const movies = await Movies.findAll({
      attributes: ["image_url", "title", "creation_date"],
    });
    res.json({ movies: movies });
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const getMovieById = async (req, res) => {
  const { id } = req.params;

  try {
    const movie = await Movies.findOne({
      where: { id },
    });
    const characters = await charactersMovies.findAll({
      where: { MovieId: id },
      attributes: ["CharacterId"],
    });
    res.json({ movie: movie, characters: characters });
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const createMovie = async (req, res) => {
  const { title, creation_date, calification } = req.body;
  try {
    const newMovie = await Movies.create({
      title,
      creation_date,
      calification,
    });

    const file = req.file
    if (file){
        const type = file.mimetype.split('/')[1]
        const key = newMovie.title + '.' + type
  
       await uploadImage(newMovie.title, file.buffer, type)
           newMovie.image_url = `https://${envConfig.aws.bucketName}.s3.${envConfig.aws.region}.amazonaws.com/${key}`
      }

    res.json(newMovie);
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movies.findOne({
      where: { id },
    });

    const file = req.file
    if (file){
        const type = file.mimetype.split('/')[1]
        const key = updatedMovie.title + '.' + type
  
       await uploadImage(updatedMovie.title, file.buffer, type)
           updatedMovie.image_url = `https://${envConfig.aws.bucketName}.s3.${envConfig.aws.region}.amazonaws.com/${key}`
      }

    updatedMovie.set(req.body);
    await updatedMovie.save();

    res.json(updatedMovie);
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    const movie = await Movies.findOne({
      where: { id },
    });
    
    if (movie?.image_url){
      const key = movie.image_url.split('/')[3]
       await deleteImage(key)
    }

    await Movies.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    handleHttpError(error, res)
  }
};
