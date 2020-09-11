const router = require('express').Router();
const Users = require('./auth-model')

// GET all users
// router.get('/users', usersMiddleware.restrict(), async (req, res, next) => {
  router.get('/users', async (req, res, next) => {
    try {
        res.json(await Users.findAll())
    } catch(error) {
        next(error)
    }
})

router.post('/register', (req, res) => {
  // implement registration
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
