import { Op } from "sequelize";
import { deleteImage, uploadImage } from "../config/awsConfig.js";
import { handleHttpError } from "../handlers/handleHttpError.js";
import { Characters } from "../models/characters.model.js";
import { charactersMovies } from "../models/references.js";
import { envConfig } from "../config/envConfig.js";

export const getAllCharacters = async (req, res) => {
  const { name, age, weight, movies } = req.query;
  try {
    if (name) {
      const findByName = await Characters.findAll({
        where: {
          name: { [Op.iLike]: '%'+name+'%' }
        },
        attributes: ["image_url", "name"],
      });
      if (!findByName){
       return res.json('Name does not match')
      }
      res.json(findByName);
    }

    if (age) {
      const findByAge = await Characters.findAll({
        where: { age: age },
        attributes: ["image_url", "name"],
      });
      res.json(findByAge);
    }

    if (weight) {
      const findByWeight = await Characters.findAll({
        where: { weight: weight },
        attributes: ["image_url", "name"],
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
      attributes: ["image_url", "name"],
    });
    res.json({ characters: characters });
  } catch (error) {
    console.log(error)
  }
};

export const getCharacterById = async (req, res) => {
  const { id } = req.params;
  try {
    const character = await Characters.findOne({
      where: { id },
    });
    if (!character){
      res.json({ Error: 'Character not found'})
    }
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
  try {
    const { name, age, weight, history, asociated_movies } = req.body;

    
      const newCharacter = await Characters.create({
        name,
        age,
        weight,
        history,
        asociated_movies,
      });
    
    const file = req.file;
    if (file){
      const type = file.mimetype.split('/')[1]
      const key = newCharacter.name + '.' + type

     await uploadImage(newCharacter.name, file.buffer, type)
         newCharacter.image_url = `https://${envConfig.aws.bucketName}.s3.${envConfig.aws.region}.amazonaws.com/${key}`
      
    }  
    res.json(newCharacter);
  } catch (error) {
    console.log(error)
  }
};

export const updateCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedCharacter = await Characters.findOne({
      where: { id },
    });
  
    updatedCharacter.set(req.body);

    const file = req.file;
    if (file){
      const type = file.mimetype.split('/')[1]
      const key = updatedCharacter.name + '.' + type

     await uploadImage(updatedCharacter.name, file.buffer, type)
         updatedCharacter.image_url = `https://${envConfig.aws.bucketName}.s3.${envConfig.aws.region}.amazonaws.com/${key}`
      
    }

    await updatedCharacter.save();
    res.json(updatedCharacter);

  } catch (error) {
    console.log(error)
  }
};

export const deleteCharacter = async (req, res) => {
  const { id } = req.params;

  try {
    const character = await Characters.findOne({
      where: { id },
    });
    
    if (character?.image_url){
      const key = character.image_url.split('/')[3]
       await deleteImage(key)
    }

    await Characters.destroy({
      where: { id },
    });
    res.sendStatus(204);
  
  } catch (error) {
    console.log(error)
  }
};


