const {Schema, model} =require('mongoose')

const User= new Schema({
    username:{
        type: String,
        required:true,
        unique:true
    },
    password:{
        type: String,
        required:true
    },
    boards:{
        type: Array,
        default: [],
    }
})
module.exports = model('User',User)