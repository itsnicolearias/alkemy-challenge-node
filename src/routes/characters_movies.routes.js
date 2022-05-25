import express  from "express";
import { getAllReferences, createReference, deleteReference } from "../controllers/characters_movies.controllers.js";

const router = express.Router()

router.get('/', getAllReferences)

router.post('/', createReference)

router.delete('/:id', deleteReference)

export default router;