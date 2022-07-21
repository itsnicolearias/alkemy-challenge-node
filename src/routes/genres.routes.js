import express from 'express'
import { getAllGenres, getGenreById, createGenre, updateGenre, deleteGenre } from '../controllers/genres.controller.js'
import multer from 'multer'

const upload = multer()
const router = express.Router()

router.get('/', getAllGenres)

router.get('/:id', getGenreById)

router.post('/', upload.single('image'), createGenre)

router.put('/:id', upload.single('image'), updateGenre)

router.delete('/:id', deleteGenre)

export default router;