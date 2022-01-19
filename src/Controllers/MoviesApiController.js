import { errorResponse,successResponse } from '../Responses/response.js'
import { MoviesApiService } from '../Services/MovieApiService.js'

class MoviesApiControllerClass
{
    async getMovies(req, res)
    {
        return MoviesApiService.getMovies()
    }
}

const MoviesApiController = new MoviesApiControllerClass()

export { MoviesApiController }