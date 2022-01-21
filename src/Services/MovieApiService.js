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

               const {title, opening_crawl, release_date, url} = data

               const filmId = url.split('/')[5]

               const comments = await Comment.count({where: {filmId}})

               return { filmId, title, opening_crawl, release_date, comments}
            }))
    
            return successResponse(req, res, 'success', movies)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    addCommentToAMovie = async (req, res) => {
        try{
            const { filmId } = req.params

            const { comment } = req.body 

            const ip_address = req.ip.split(':')[3]

            await Comment.create({filmId, comment, ip_address: ip_address})

            return successResponse(req, res, 'comment added', {}, 201)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    fetchAMoviesComments = async (req, res) => {
        try{
            const { filmId } = req.params
            
            const comments = await Comment.findAll({ where: { filmId }, order: [['createdAt', 'DESC']]})

            return successResponse(req, res, 'success', comments)
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    fetchAMoviesCharacters = async (req, res) => {
        try{
            const { filmId } = req.params

            const characterResponse = await axios.get('https://swapi.py4e.com/api/people')

            const movieCharacterData = this.getMovieCharacters(characterResponse.data.results, filmId)

            const {sortField, order, filter} = req.query

            const sortDirection = order  === 'ASC' ? this.sortCharactersAsc(sortField) : this.sortCharactersDesc(sortField)

            const movieCharacters = movieCharacterData.sort(sortDirection)

            const characters = movieCharacters.map((data) => {

                const { name, gender, height } = data

                const characterId = data.url.split('/')[5]

                return { characterId, name, gender, height}
            })
    
            return successResponse(req, res, 'success', this.filterGender(characters, filter))
        }
        catch (error) {
            return errorResponse(req, res, error.message)
        }
    }

    getMovieCharacters = (allCharacters, filmId) => {
        return allCharacters.filter((character) => 
            character.films.includes(`https://swapi.py4e.com/api/films/${filmId}/`)
        )
    }

    filterGender = (characterList, filterKey) => {
        if (filterKey) {
            characterList = characterList.filter(character => filterKey === character.gender)
        }

        const totalHeight = characterList.reduce((a, b) => a + Number(b.height), 0)
           
        return { 
            characterList, 
            metadata: 
                { 
                    totalNumber: characterList.length,
                    totalHeightInFeet: parseFloat(totalHeight * 0.03281).toFixed(4),
                    totalHeightInInches: parseFloat(totalHeight * 0.3937).toFixed(4)
                }
            }
    }

    sortCharactersAsc = (sortKey) => {
        
        return function (a, b) {
            a[sortKey] = sortKey === 'height' ? Number(a[sortKey]) : a[sortKey]
            b[sortKey] = sortKey === 'height' ? Number(b[sortKey]) : b[sortKey]
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
            a[sortKey] = sortKey === 'height' ? Number(a[sortKey]) : a[sortKey]
            b[sortKey] = sortKey === 'height' ? Number(b[sortKey]) : b[sortKey]

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