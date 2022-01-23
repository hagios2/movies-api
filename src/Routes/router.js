  
import express from 'express'
import { MoviesApiController } from '../Controllers/MoviesApiController.js'
import { ValidateRequest } from '../Middleware/ValidateRequest.js'
import commentRequestSchema from '../Schemas/CommentRequestSchema.js'

const router = express.Router()

//------------------------------------ Movie Api Routes -----------------------------------------------

router.get("/fetch/movies", MoviesApiController.getMovies)

router.post("/add/movie/:filmId/comment", ValidateRequest(commentRequestSchema), MoviesApiController.addCommentToAMovie)

router.get("/fetch/movie/:filmId/comments", MoviesApiController.fetchAMoviesComments)

router.get("/fetch/movie/:filmId/characters", MoviesApiController.fetchAMoviesCharacters)

//------------------------------------ End of Route -----------------------------------------------

export default router