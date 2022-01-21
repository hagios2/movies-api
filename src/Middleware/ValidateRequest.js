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

// const validateRequestQuery = (schema: AnySchema) => async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     await schema.validate({
//       query: req.query
//     })

//     return next()
//   } catch (error) {
//     log.error(error)
//     return errorResponse(req, res, error)
//   }
// }

export { ValidateRequest }