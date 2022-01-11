

const jwt = require('jsonwebtoken')
const {secret} = require('../config/secret')


module.exports =function (req, res, next){
    if (req.method === "OPTIONS"){
        next()
    }
    try {
        const token=req.headers.authorization.split(' ')[1]
        // console.log(token)
        if(!token){
            return res.status(400).send('Пользователь не авторизован')
        }
        const decodedData = jwt.verify(token,secret)
        req.user=decodedData
        next()

    }
    catch (e){
        console.log(e)
        res.status(400).send('Пользователь не авторизован')
    }
};