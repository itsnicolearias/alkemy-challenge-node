import { Characters } from '../models/characters.model.js'


export const getAllCharacters = async(req, res) => {
    try {
        const characters = await Characters.findAll({
            attributes: ["image", "name"],
        });
       
        res.json({characters: characters})
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const getCharacterById = async(req, res) => {
    const { id } = req.params
    try {
        const character = await Characters.findOne({
            where: {id}
        })
        res.json(character)
    } catch (error) {
        
    }
}

export const createCharacter = async(req, res) => {
    const { image, name, age, weight, history, asociated_movies } = req.body

    try {
        const newCharacter = await Characters.create({
            image,
            name,
            age,
            weight,
            history,
            asociated_movies

        })
        res.json(newCharacter)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const updateCharacter = async(req, res) => {
    const { id } = req.params;
    
    try {
        const updatedCharacter = await Characters.findOne({
            where: {id}
        })
        updatedCharacter.set(req.body)
        await updatedCharacter.save()
        
        res.json(updatedCharacter)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}

export const deleteCharacter = async(req, res) => {
    const { id } = req.params;

    try {
        await Characters.destroy({
            where: {id}
        })
        res.sendStatus(204)
    } catch (error) {
        res.status(500).json({
            message: error.message,
          });
    }
}