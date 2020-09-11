const router = require('express').Router();
const Users = require('./auth-model')
const bcrypt = require('bcryptjs')

// GET all users
// router.get('/users', usersMiddleware.restrict(), async (req, res, next) => {
  router.get('/users', async (req, res, next) => {
    try {
        res.json(await Users.findAll())
    } catch(error) {
        next(error)
    }
})

router.post('/register', async (req, res, next) => {
  // implement registration
	try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()

		if (user) {
			return res.status(409).json({
				message: "Username is already taken",
			})
		}

		const newUser = await Users.add({
			username,
      password: await bcrypt.hash(password, 14)
		})

		res.status(201).json(newUser)
	} catch(err) {
		next(err)
	}
});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
