  
import express from 'express'
import { MoviesApiController } from '../Controllers/MoviesApiController.js'

const router = express.Router()

//------------------------------------ Movie Api Routes -----------------------------------------------

router.get("/fetch/movies", MoviesApiController.getMovies)


//------------------------------------ End of Route -----------------------------------------------


export default router