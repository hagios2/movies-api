class MoviesApiServiceClass
{
    async getMovies(req, res)
    {
        try{

            return successResponse(req, res, 'success', {})
        }
        catch (error) {

            return errorResponse(req,res,error)
        }
    }

}

const MoviesApiService = new MoviesApiServiceClass()

export { MoviesApiService }