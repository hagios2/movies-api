const errorResponse = (req, res, error, code = 500) => {

    res.status(code).json({error: error})
}

const successResponse = (req, res, message = "OK", data = {}, code = 200) => {

    res.status(code).json({message, data})
}

export { errorResponse, successResponse }