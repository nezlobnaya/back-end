const request = require('supertest')
const server = require('../server')
const db = require('../data/db-config')
const Stories = require('./stories-model')


describe('Stories Router', () => {
    beforeEach(async () => {
        await db('stories').truncate()
    })

    // get /
    describe('Get all the stories', () => {

        it('should return a status code of 200', () => {
            const expectedCode = 200
            let response
            request(server).get('/api/stories').then(res => {
                response = res
                expect(response.status).toBe(expectedCode)
                expect(res.type).toBe('application/json')
                expect(res.body).toEqual([])
            })
        })
    })

  
})
