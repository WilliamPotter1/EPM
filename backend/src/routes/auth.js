const express = require('express');
const { register } = require('../controllers/authController');
const { validate, userSchema } = require('../middleware/validation');

const router = express.Router();

router.post('/register', validate(userSchema), register);

module.exports = router; 