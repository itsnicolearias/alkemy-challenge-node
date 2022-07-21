import express from 'express';
import { getAllMovies, getMovieById, createMovie, updateMovie, deleteMovie } from '../controllers/movies.controller.js';
import multer from 'multer';

const upload = multer()
const router = express.Router()

router.get('/', getAllMovies)

router.get('/:id', getMovieById)

router.post('/', upload.single('image'), createMovie)

router.put('/:id', upload.single('image'), updateMovie)

router.delete('/:id', deleteMovie)




export default router;