import { MoviesApiService } from '../Services/MovieApiService.js'

class MoviesApiControllerClass
{
    getMovies = async(req, res) => {
        return MoviesApiService.getMovies(req, res)
    }

    addCommentToAMovie = async(req, res) => {
        return MoviesApiService.addCommentToAMovie(req, res)
    }

    fetchAMoviesComments = async(req, res) => {
        return MoviesApiService.fetchAMoviesComments(req, res)
    }

    fetchAMoviesCharacters = async (req, res) => {
        return MoviesApiService.fetchAMoviesCharacters(req, res)
    }
}

const MoviesApiController = new MoviesApiControllerClass()

export { MoviesApiController }