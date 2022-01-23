import supertest from 'supertest'
import { app } from '../app.js'
import { testDbConnect, testDbClose } from '../config/test_db'
import { Comment } from '../Models/Comment.js'

beforeAll(async () => await testDbConnect())
// beforeEach(async () => await testDbClear())
afterAll(async () => await testDbClose())

describe('starwars movie api', () => {
  describe('GET /api/fetch/movies', () => {
    it('should respond with 200 status', async () => {

      const response = await supertest(app).get('/api/fetch/movies').send({})

      expect(response.statusCode).toBe(200)
    })

  //   it('should expect response body _id to be defined', async () => {
  //     const department = 'Platforms'
  //     const response = await supertest(app).post('/api/admin/create/department').send({
  //       name: department
  //     })

  //     expect(response.body.data._id).toBeDefined()
  //   })

  //   it('should expect response body name to be equal to department', async () => {
  //     const department = 'Platforms'
  //     const response = await supertest(app).post('/api/admin/create/department').send({
  //       name: department
  //     })

  //     expect(response.body.data.name).toEqual(department)
  //   })

  //   it('should respond with status 422 if name is not provided', async () => {
  //     const response = await supertest(app).post('/api/admin/create/department').send({})

  //     expect(response.statusCode).toBe(422)
  //   })
  // })

  // describe('GET /api/admin/get/departments', () => {
  //   it('should respond with 403 status when not authenticated', async () => {
  //     const response = await supertest(app).get('/api/admin/get/departments')

  //     expect(response.statusCode).toBe(403)
  //   })

  //   it('should respond with 200 status', async () => {
  //     const department = await Department.create({ name: 'Platform' })
  //     const user = {
  //       name: 'Mamphey',
  //       email: 'hagioswilson@gmail.com',
  //       password: '123456789',
  //       departmentId: department._id
  //     }

  //     await supertest(app).post('/api/auth/register').send(user)

  //     const loginResponse = await supertest(app).post('/api/auth/login').send({
  //       email: user.email,
  //       password: user.password
  //     })

  //     const response = await supertest(app).get('/api/admin/get/departments').set('Authorization', `Bearer ${loginResponse.body.data.token}`)

  //     expect(response.statusCode).toBe(200)
  //   })
  // })

  // describe('GET api/admin/department/:departmentId/fetch', () => {
  //   it('should respond with 200 status', async () => {
  //     const department = await Department.create({ name: 'Platform' })
  //     const user = {
  //       name: 'Mamphey',
  //       email: 'hagioswilson@gmail.com',
  //       password: '123456789',
  //       departmentId: department._id
  //     }

  //     await supertest(app).post('/api/auth/register').send(user)

  //     const loginResponse = await supertest(app).post('/api/auth/login').send({
  //       email: user.email,
  //       password: user.password
  //     })

  //     const response = await supertest(app).get(`/api/admin/department/${department._id}/fetch`).set('Authorization', `Bearer ${loginResponse.body.data.token}`)

  //     expect(response.statusCode).toBe(200)
  //   })

  //   it('should expect  resonse data to be defined', async () => {
  //     const department = await Department.create({ name: 'Platform' })
  //     const user = {
  //       name: 'Mamphey',
  //       email: 'hagioswilson@gmail.com',
  //       password: '123456789',
  //       departmentId: department._id
  //     }

  //     await supertest(app).post('/api/auth/register').send(user)

  //     const loginResponse = await supertest(app).post('/api/auth/login').send({
  //       email: user.email,
  //       password: user.password
  //     })

  //     const response = await supertest(app).get(`/api/admin/department/${department._id}/fetch`).set('Authorization', `Bearer ${loginResponse.body.data.token}`)

  //     expect(response.body.data).toBeDefined()
  //   })
  })
})