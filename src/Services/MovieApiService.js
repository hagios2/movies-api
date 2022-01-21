import { Comment } from '../Models/Comment.js'
import axios from 'axios'
import { successResponse, errorResponse } from '../Responses/response.js'
class MoviesApiServiceClass
{
    getMovies = async(req, res) => {
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

    addCommentToAMovie = async (req, res) => {
        try{
            const { episode_id } = req.params

            const { comment } = req.body 

            const ip_address = req.ip.split(':')[3]

            await Comment.create({episode_id, comment, ip_address: ip_address})

            return successResponse(req, res, 'comment added', {}, 201)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    fetchAMoviesComments = async (req, res) => {
        try{
            const { episode_id } = req.params
            
            const comments = await Comment.findAll({ where: { episode_id }, order: [['createdAt', 'DESC']]})

            return successResponse(req, res, 'success', comments)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    fetchAMoviesCharacters = async (req, res) => {
        try{
            const characterResponse = await axios.get('https://swapi.py4e.com/api/people')

            const {sortField, order, filter} = req.query

            const sortDirection = order  === 'ASC' ? this.sortCharactersAsc(sortField) : this.sortCharactersDesc(sortField)

            const movieCharacterData = characterResponse.data.results.sort(sortDirection)

            const characters = movieCharacterData.map((data) => {

                const { name, gender, height } = data

                return { name, gender, height}
            })
    
            return successResponse(req, res, 'success', this.filterGender(characters, filter))
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    filterGender = (characterList, filterKey) => {

        if (filterKey) {
            const filteredCharacters = characterList.filter(character => filterKey === character.gender)

            const totalHeight = filteredCharacters.reduce((a, b) => a + Number(b.height), 0)
           
            return { 
                characterList: filteredCharacters, 
                metadata: 
                    { 
                        totalNumber: filteredCharacters.length,
                        totalHeightInFeet: parseFloat(totalHeight * 0.03281).toFixed(4),
                        totalHeightInInches: parseFloat(totalHeight * 0.3937).toFixed(4)
                    }
                }
        }

        return { characterList }
    }

    sortCharactersAsc = (sortKey) => {
        return function (a, b) {
            if (a[sortKey] < b[sortKey]) {
                return -1;
            }
            if (a[sortKey] > b[sortKey]) {
                return 1;
            }
            return 0;
        };
    };
    
    sortCharactersDesc = (sortKey) => {
        return function (a, b) {
            if (a[sortKey] > b[sortKey]) {
                return -1;
            }
            if (a[sortKey] < b[sortKey]) {
                return 1;
            }
            return 0;
        };
    };
}

const MoviesApiService = new MoviesApiServiceClass() 

export { MoviesApiService }