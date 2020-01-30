const Stories = require('./stories-model')
const request = require('supertest')

const server = require('../server')
const db = require('../data/db-config')

describe('the Stories model', () => {

    beforeEach(async () => {
        await db('stories').truncate()
    })

    describe('the add function', () => {
        it('should insert an entry to the db', async () => {
            const storyData = { title: 'War', contents: 'text' } 
            const story = await Stories.add(storyData)
            const stories = await db('stories')
            expect(stories[0].title).toBe('War')
            expect(stories.length).toBe(1)
        })
    })

})


