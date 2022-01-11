const {Schema, model} =require('mongoose')

let Todos = new Schema({
    todo: {
        type: String,
        required: true
    },
    done:{
        type: Boolean,
        default: false,
    },
    column:{
        type:String,
        required: true,
    },
    assignUser:{
        type:Object,
        required: false,
    }
})
module.exports = model('Todos', Todos)