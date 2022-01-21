  
import express from 'express'
import { MoviesApiController } from '../Controllers/MoviesApiController.js'

const router = express.Router()

//------------------------------------ Movie Api Routes -----------------------------------------------

router.get("/fetch/movies", MoviesApiController.getMovies)

router.post("/add/movie/:episode_id/comment", MoviesApiController.addCommentToAMovie)

router.get("/fetch/movie/:episode_id/comments", MoviesApiController.fetchAMoviesComments)

//------------------------------------ End of Route -----------------------------------------------


export default router