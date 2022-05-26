import express from 'express';
import authRoutes from './auth.routes.js'
import charactersRoutes from './characters.routes.js'
import moviesRouter from './movies.routes.js'
import genreRoutes from './genres.routes.js'
import CMroutes from './characters_movies.routes.js'
import MGroutes from './movies_genres.routes.js'

const router = express.Router()

router.use('/auth', authRoutes)

router.use('/characters', charactersRoutes)

router.use('/movies', moviesRouter)

router.use('/genre', genreRoutes)


router.use('/cm', CMroutes)
router.use('/mg', MGroutes)

export default router;