const router = require('express').Router();

const Stories = require('./stories-model')
const restricted = require('../auth/authenticate-middleware')

router.get('/', (req, res) => {
    Stories.find()
    .then(stories => {
        res.json(stories)
    })
    .catch(err => {
        res.status(500).json({message: "Failed to retrieve stories ",err})
    })
})

router.get('/pending', restricted, (req, res) => {
    const { role } = req.decodedToken

    if (role === 'admin'){
        Stories.getPendingStories()
        .then(stories => {
            res.json(stories)
        })
        .catch(err => {
            console.log(err)
            next(err)
        })
    } 
})


router.get('/:id', (req, res) => {
    const {id} = req.params

    Stories.findById(id)
        .then(story => {
            if (story) {
                res.status(200).json(story)
            } else {
                res.status(401).json({message: "Unable to find a story wih the given id"})
            }
        })
        .catch(err => {
            res.status(500).json({message: "Failed to find story ",err})
        })
})



router.post('/', restricted, (req, res) => {
    const storyData = req.body


    Stories.add(storyData)
        .then(story => {
            res.status(201).json(story)
        })
        .catch(err => {
            console.log(err)
            res.status(500).json({message: "Failed to create story ",err})
        })
})

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const { role } = req.decodedToken

   
        Stories.remove(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted })
            } else {
                res.status(404).json({ message: 'Could not find story with given id '})
            }
        })
        .catch(err => {
            next(err)
        })
     
    });

router.put('/:id', restricted, (req,res) => {
    const { id } = req.params
    const changes = req.body

    Stories.findById(id)
    .then(story => {
        if (story) {
            Stories.update(changes, id)
            .then(updatedStory => {
                res.json(updatedStory)
            })
        } else {
            res.status(404).json({ message: 'Could not find story with given id' })
        }
    })
    .catch(err =>  {
        next(err)
    })
})


module.exports = router