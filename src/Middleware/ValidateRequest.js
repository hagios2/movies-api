import { errorResponse } from '../Responses/response.js'

const ValidateRequest = (validator) => async (req, res, next) => {
  try {
    await validator.validate({
      body: req.body
    })

    return next()
  } catch (error) {
    return errorResponse(req, res, error.message, 422)
  }
}

export { ValidateRequest }