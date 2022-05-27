import { Movies } from "../models/movies.model.js";
import { charactersMovies } from "../models/references.js";
import { Genre } from "../models/genre.model.js";
import { Op } from "sequelize";
import { MoviesGenres } from "../models/references.js";

export const getAllMovies = async (req, res) => {
  const { name, genre, order } = req.query;

  try {
    if (name) {
      const moviesByName = await Movies.findAll({
        where: {
          title: { [Op.iLike]: '%'+name+'%' }
            },
         
        attributes: ["image", "title", "creation_date"],
      });
      return res.json(moviesByName);
    }

    if (order) {
      const moviesByOrder = await Movies.findAll({
        order: [["creation_date", order]],
        attributes: ["image", "title", "creation_date"],
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
      attributes: ["image", "title", "creation_date"],
    });
    res.json({ movies: movies });
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
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
    res.status(500).json({
      message: error.message,
    });
  }
};

export const createMovie = async (req, res) => {
  const { image, title, creation_date, calification, asociated_characters } =
    req.body;
  try {
    const newMovie = await Movies.create({
      image,
      title,
      creation_date,
      calification,
      asociated_characters,
    });
    res.json(newMovie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const updateMovie = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedMovie = await Movies.findOne({
      where: { id },
    });
    updatedMovie.set(req.body);
    await updatedMovie.save();

    res.json(updatedMovie);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};

export const deleteMovie = async (req, res) => {
  const { id } = req.params;
  try {
    await Movies.destroy({
      where: { id },
    });
    res.sendStatus(204);
  } catch (error) {
    res.status(500).json({
      message: error.message,
    });
  }
};
