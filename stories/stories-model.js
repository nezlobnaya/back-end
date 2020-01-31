const db = require('../data/db-config')

module.exports = {
    find,
    findBy,
    findById,
    add,
    remove,
    update,
    getComments,
    addComment,
    removeComment,
    getCommentById,
    getPendingStories,
}

function find() {
    return db('stories').where({ pending: false })
}

function findBy(filter) {
    return db('stories').where(filter)
}

function add(story) {
    return db('stories').insert(story).returning('*')
}

function findById(id) {
    return db('stories')
        .where({id})
        .first()
}

function remove(id) {
    const story = findById(id)
    return db('stories')
        .where({id})
        .del()
}

function update(changes, id) {
    return db('stories')
        .where({id})
        .update(changes).returning('*')
}

function getComments(storyId) {
    return db('comments as c')
        .join('stories as s', 's.id', 'c.story_id')
        .select('c.contents', 's.title')
        .where({story_id: storyId})
        .orderBy('c.id')
}

function getCommentById(id) {
    return db('comments')
        .where({id})
        .first()
}

function addComment(comment) {
    return db('comments').insert(comment).returning('*')
}

function removeComment(commentId) {
    return db('comments')
        .where({id: commentId})
        .del()
}

function getPendingStories() {
    return db('stories')
        .where({pending: 1})
}