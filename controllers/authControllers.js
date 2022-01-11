

const User = require("../models/users");
const jwt =require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const {secret} =require('../config/secret')

const generateAccessToken = (id) =>{
    const payload={
        id
    }
    return jwt.sign(payload,secret,{expiresIn:'12h'})
}

class authControllers{
    async registration (req,res)  {
        try{
            const username=req.body.username
            const password=req.body.password
            const candidate=await User.findOne({username})
            if(candidate){
                return res.status(400).send('Пользователь с таким ником уже существует')

            }
            const hashPassword=bcrypt.hashSync(password,7)
            const user =new User({username,password: hashPassword})
            await user.save()
            const token=generateAccessToken(user._id,)
            return res.status(201).send({token, id:user._id})
        }
        catch (e){

            console.log(e)
            res.send('Registrations error')
        }

    }
    async login(req, res) {

        try {
            const username=req.body.username
            const password=req.body.password
            const user=await User.findOne({username})
            if(!user){
                return res.status(400).send('Пользователь не найден')
            }
            const validPassword=bcrypt.compareSync(password,user.password)
            if(!validPassword){
                return res.send('Неверный пароль')
            }
            const token=generateAccessToken(user._id,)
            return res.status(200).send({token, id:user._id})


        } catch (e) {
            console.log(req.body.username)
            console.log(e)
            res.status(400).send('logining is failed')
        }

    }

    async getUsers(req,res){
        try{
            const users =await User.find()
            res.status(200).send(users)

        }
        catch (e){
            console.log(e)
            res.status(400).send('error')
        }
    }


}
module.exports=new authControllers()