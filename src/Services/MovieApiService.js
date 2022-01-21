// import request from '../utils/axios.js'
import axios from 'axios'
import { successResponse, errorResponse } from '../Responses/response.js'
class MoviesApiServiceClass
{
    async getMovies(req, res)
    {
        try{
            const movieResponse = await axios.get('https://swapi.py4e.com/api/films')

            const movieData = movieResponse.data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))

            const movies = movieData.map((data) => {
               const {title, episode_id, opening_crawl, release_date} = data

               return {title, episode_id, opening_crawl, release_date, comments: 0}
            })
    
            return successResponse(req, res, 'success', movies)
        }
        catch (error) {
            return errorResponse(req, res, error)
        }
    }
}

const MoviesApiService = new MoviesApiServiceClass()

export { MoviesApiService }