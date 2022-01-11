const Router =require('express');
const authRouter =new Router();
const User = require('../models/users')
const {log} = require("nodemon/lib/utils");
const bodyParser =require('body-parser')
const authController =require('../controllers/authControllers')
const authMiddleware =require('../middleware/authMiddleware')

authRouter.post('/register',authController.registration)

authRouter.post('/login',authController.login)

authRouter.get('/getUsers',authMiddleware, authController.getUsers)



module.exports = authRouter