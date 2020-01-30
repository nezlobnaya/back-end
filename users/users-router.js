const router = require('express').Router();

const Users = require('./users-model')
const restricted = require('../auth/authenticate-middleware')

router.get('/', restricted, (req, res, next) => {
    // console.log('decoded', req.decodedToken)

    const { sub, role } = req.decodedToken

    if (role === 'admin') {
        Users.find()
        .then(users => {
        res.json(users)
    })
    .catch(err => {
        next(err)
    })
    } else {
        Users.findById(sub)
        .then(user => {
            res.json(user)
        })
        .catch(err => res.status(500).send(err))
    }
})

router.delete('/:id', restricted, (req, res) => {
    const { id } = req.params;
    const { role } = req.decodedToken

    if (role === 'admin') {
        Users.removeUser(id)
        .then(deleted => {
            if (deleted) {
                res.json({ removed: deleted })
            } else {
                res.status(404).json({ message: 'Could not find user with given id '})
            }
        })
        .catch(err => {
            next(err)
        })
      }   
    });


module.exports = router 