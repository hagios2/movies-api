import { Comment } from '../Models/Comment.js'
import axios from 'axios'
import { successResponse, errorResponse } from '../Responses/response.js'
class MoviesApiServiceClass
{
    async getMovies(req, res)
    {
        try{
            const movieResponse = await axios.get('https://swapi.py4e.com/api/films')

            const movieData = movieResponse.data.results.sort((a, b) => new Date(a.release_date) - new Date(b.release_date))

            const movies = await Promise.all(movieData.map( async (data) => {

               const {title, episode_id, opening_crawl, release_date} = data

               const comments = await Comment.count({where: {episode_id}})

               return { title, episode_id, opening_crawl, release_date, comments }
            }))
    
            return successResponse(req, res, 'success', movies)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    async addCommentToAMovie(req, res)
    {
        try{
            const { episode_id } = req.params

            const { comment } = req.body 

            const ip_address = req.ip

            await Comment.create({episode_id, comment, ip_address})

            return successResponse(req, res, 'comment added', {}, 201)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    async fetchAMoviesComments(req, res)
    {
        try{
            const { episode_id } = req.params
            
            const comments = await Comment.findAll({ where: { episode_id }})

            return successResponse(req, res, 'success', comments)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }
}

const MoviesApiService = new MoviesApiServiceClass()

export { MoviesApiService }