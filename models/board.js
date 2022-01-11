const {Schema, model} =require('mongoose')
const Todos = require('./todos')

const Board= new Schema({
    name:{
        type: String,
        required:true
    },
    id:{
      type:String,
    },
    todosList:{
        type: Array ,
        default:[]
    },
    columns:{
      type: Array,
    },
    author:{
        type: String,
        required: true,
    },
    accessUser:{
        type:Array,
        default:[]
    },
})
module.exports = model('Board',Board)
