const supertest = require('supertest')
const server = require('./server')

test('server.js', async () => {

    beforeEach(async () => {
        await db('refugees').truncate()
    })

    const res = await supertest(server).get('/')
    expect(res.status).toBe(200)
    expect(res.type).toBe('text/html')
    expect(process.env.NODE_ENV).toBe('test')
})