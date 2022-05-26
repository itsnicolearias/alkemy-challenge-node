import express from 'express';
import { getAllReferences, createReference, deleteReference } from '../controllers/movies_genres.controllers.js';

const router = express.Router()

router.get('/', getAllReferences)

router.post('/', createReference)

router.delete('/', deleteReference)

export default router;