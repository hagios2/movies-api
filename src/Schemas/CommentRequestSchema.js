import { object, string } from 'yup'

const commentRequestSchema = object({
  body: object({
    comment: string().required('Comment is required').max(500, 'Comment should be limited to 500 words')
  })
})

export default commentRequestSchema