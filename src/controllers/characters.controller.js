import { Op } from "sequelize";
import { handleHttpError } from "../handlers/handleHttpError.js";
import { Characters } from "../models/characters.model.js";
import { charactersMovies } from "../models/references.js";

export const getAllCharacters = async (req, res) => {
  const { name, age, weight, movies } = req.query;
  try {
    if (name) {
      const findByName = await Characters.findAll({
        where: {
          name: { [Op.iLike]: '%'+name+'%' }
        },
        attributes: ["image", "name"],
      });
      res.json(findByName);
    }

    if (age) {
      const findByAge = await Characters.findAll({
        where: { age: age },
        attributes: ["image", "name"],
      });
      res.json(findByAge);
    }

    if (weight) {
      const findByWeight = await Characters.findAll({
        where: { weight: weight },
        attributes: ["image", "name"],
      });
      res.json(findByWeight);
    }

    if (movies) {
      const findByMovie = await charactersMovies.findAll({
        where: { MovieId: movies },
        attributes: ["CharacterId"],
      });
     
      res.json(findByMovie);
    } 
    
    const characters = await Characters.findAll({
      attributes: ["image", "name"],
    });
    res.json({ characters: characters });
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const getCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await Characters.findOne({
      where: { id },
    });
    const movies = await charactersMovies.findAll({
      where: { CharacterId: id },
      attributes: ["MovieId"],
    });
    res.json({ character: character, movies: movies });
  
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const createCharacter = async (req, res) => {
  
  const { image, name, age, weight, history, asociated_movies } = req.body;

  try {
    const newCharacter = await Characters.create({
      image,
      name,
      age,
      weight,
      history,
      asociated_movies,
    });
    res.json(newCharacter);
  } catch (error) {
    handleHttpError(error, res)
  }
};

export const updateCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCharacter = await Characters.findOne({
      where: { id },
    });
    updatedCharacter.set(req.body);
    await updatedCharacter.save();
    res.json(updatedCharacter);

  } catch (error) {
    handleHttpError(error, res)
  }
};

export const deleteCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    await Characters.destroy({
      where: { id },
    });
    res.sendStatus(204);
  
  } catch (error) {
    handleHttpError(error, res)
  }
};


