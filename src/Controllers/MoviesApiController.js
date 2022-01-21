import { MoviesApiService } from '../Services/MovieApiService.js'

class MoviesApiControllerClass
{
    async getMovies(req, res)
    {
        return MoviesApiService.getMovies(req, res)
    }

    async addCommentToAMovie(req, res)
    {
        return MoviesApiService.addCommentToAMovie(req, res)
    }

    async fetchAMoviesComments(req, res)
    {
        return MoviesApiService.fetchAMoviesComments(req, res)
    }
}

const MoviesApiController = new MoviesApiControllerClass()

export { MoviesApiController }