const router = require('express').Router()
const Users = require('./auth-model')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')

// GET all users
// router.get('/users', usersMiddleware.restrict(), async (req, res, next) => {
router.get('/users', async (req, res, next) => {
    try {
        res.json(await Users.findAll())
    } catch(error) {
        next(error)
    }
})

// ----------------------------------------

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

// ----------------------------------------

router.post('/login', async (req, res, next) => {
  // implement login
  try {
		const { username, password } = req.body
		const user = await Users.findBy({ username }).first()
		
		if (!user) {
			return res.status(401).json({
				message: "Invalid Credentials",
			})
		}

		// compare pw from request body to hash stored in db (returns true/false)
		const passwordValid = await bcrypt.compare(password, user.password)

		// if they don't match, return with error
		if (!passwordValid) {
			return res.status(401).json({
				message: "You shall not pass!",
			})
		}

    // generate a new JSON web token (install dotenv)
    const token = generateToken(user)

    // send the token back
		res.status(200).json({
      message: `Welcome ${user.username}!`,
      token,
		})
	} catch(err) {
		next(err)
	}
});

// ----------------------------------------

// generate token
function generateToken(user) {
  const payload = {
      subject: user.id,
      username: user.username,
  }

  const options = {
      expiresIn: '1d'
  }

  const jwtSecret = process.env.JWT_SECRET || 'keep it secret, keep it safe'

  return jwt.sign(payload, jwtSecret, options)
}

module.exports = router;
