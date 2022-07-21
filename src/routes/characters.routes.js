import express from 'express';
import { getAllCharacters, getCharacterById, createCharacter, updateCharacter, deleteCharacter} from '../controllers/characters.controller.js'
import multer  from 'multer';

const upload = multer();
const router = express.Router()

router.get('/', getAllCharacters)

router.get('/:id', getCharacterById)

router.post('/', upload.single('image'), createCharacter)

router.put('/:id', upload.single('image'), updateCharacter)

router.delete('/:id', deleteCharacter)

export default router;