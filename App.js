const express =require('express');
const mongoose =require('mongoose')
const app =express();
const { key } = require('./config/keyMongo')
const cors = require('cors');
const todoRouter = require('./routes/todoRouter');
const bodyParser =require('body-parser')
const authRouter = require('./routes/authRoutes')
const port=3000;


app.use(bodyParser.urlencoded({
    extended: false
}));
app.use(cors());
app.options('*', cors());
app.use(express.json())
app.use('/todo',todoRouter);
app.use("/auth", authRouter)

async function start() {
    try {
        await mongoose.connect(`mongodb+srv://Nikita:${key}@cluster0.1pvzl.mongodb.net/todoDataBase`,
            {useUnifiedTopology: true, useNewUrlParser: true}
        )
        app.listen(port, ()=>{console.log('Server running on port:',port)})

    } catch (e) {
        console.log(e)
    }
}

start();