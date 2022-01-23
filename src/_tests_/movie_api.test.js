import supertest from 'supertest'
import { app } from '../app.js'
import { testDbConnect, testDbClose } from '../config/test_db'
import faker from 'faker'
import {jest} from '@jest/globals'

beforeAll(async () => await testDbConnect())
afterAll(async () => await testDbClose())

describe('starwars movie api', () => {
  describe('GET /api/fetch/movies', () => {
    it('should respond with 200 status', async () => {
      jest.setTimeout(30000);

      const response = await supertest(app).get('/api/fetch/movies').send({})

      expect(response.statusCode).toBe(200)
    })

    it('should expect response body data to be defined', async () => {
      const response = await supertest(app).get('/api/fetch/movies').send({})

      expect(response.body.data).toBeDefined()
      expect(Array.isArray(response.body.data)).toBeTruthy()
      expect(Object.keys(response.body.data[0]).sort()).toEqual(['title', 'comments', 'filmId', 'release_date', 'opening_crawl'].sort())
    })
  })

  describe('POST /api/add/movie/:filmId/comment', () => {
    it('should validate comment as required if not provided', async () => {
      const response = await supertest(app).post('/api/add/movie/1/comment').send({})

      expect(response.statusCode).toBe(422)

      expect(response.body).toMatchObject({
        error: 'Comment is required'
      })
    })

    it('should validate comment should be limited to 500 words', async () => {
      const comment = faker.lorem.words(700)

      const response = await supertest(app).post('/api/add/movie/1/comment').send({comment})

      expect(response.statusCode).toBe(422)
      
      expect(response.body).toMatchObject({
        error: 'Comment should be limited to 500 words'
      })
    })

    it('should comment should be saved when provided', async () => {
      const comment = faker.lorem.words(30)
      const response = await supertest(app).post('/api/add/movie/1/comment').send({comment})

      expect(response.statusCode).toBe(201)

      expect(response.body).toMatchObject({
        message: 'comment added',
        data: {}
      })
    })
  })

  describe('GET /api/fetch/movie/:filmId/comments', () => {
    it('should respond with status code 200', async () => {
      const response = await supertest(app).get('/api/fetch/movie/1/comments')

      expect(response.statusCode).toBe(200)
    })

    it('should respond with data defined as an arrary', async () => {
      const response = await supertest(app).get('/api/fetch/movie/1/comments')

      expect(response.body.data).toBeDefined()
      expect(Array.isArray(response.body.data)).toBeTruthy()
      expect(Object.keys(response.body.data[0]).sort()).toEqual(['id', 'filmId', 'comment', 'ip_address', 'createdAt', 'updatedAt'].sort())
    })
  })

  describe('GET /api/fetch/movie/:filmId/characters', () => {
    it('should respond with 200 status', async () => {
      const response = await supertest(app).get('/api/fetch/movie/1/characters').send({})

      expect(response.statusCode).toBe(200)
    })

    it('should expect resonse data to be defined', async () => {
      const response = await supertest(app).get('/api/fetch/movie/1/characters').send({})

      expect(response.body.data).toBeDefined()
      expect(Object.keys(response.body.data).sort()).toEqual(['characterList', 'metadata'].sort())
      expect(Object.keys(response.body.data.characterList[0]).sort()).toEqual(['characterId', 'name', 'gender', 'height'].sort())
      expect(Object.keys(response.body.data.metadata).sort()).toEqual(['totalNumberOfCharacters', 'totalHeightOfCharactersInFeet', 'totalHeightOfCharactersInInches'].sort())
    })
  })
})