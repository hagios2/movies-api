const errorResponse = (req, res, error, code = 500) => {

    return res.status(code).json({error: error})
}

const successResponse = (req, res, message = "OK", data = {}, code = 200) => {

    return res.status(code).json({message, data})
}

export { errorResponse, successResponse }