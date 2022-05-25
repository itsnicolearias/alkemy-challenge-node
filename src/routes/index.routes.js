import express from 'express';
import authRoutes from './auth.routes.js'
import charactersRoutes from './characters.routes.js'
import moviesRouter from './movies.routes.js'
import genreRoutes from './genres.routes.js'
import referencesRoutes from './characters_movies.routes.js'

const router = express.Router()

router.use('/auth', authRoutes)

router.use('/characters', charactersRoutes)

router.use('/movies', moviesRouter)

router.use('/genre', genreRoutes)

router.use('/references', referencesRoutes)

export default router;