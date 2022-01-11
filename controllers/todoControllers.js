const Board = require("../models/board");
const Todos = require("../models/todos");
const User = require('../models/users')



class todoControllers{
    async getBoards(req,res){
        try{
            let board = await User.findOne({_id:req.query.id})
            board = board.boards
            res.send(board)
        }
        catch (e){
            console.log(e)
            res.status(400).send('Error')
        }

    }
    async toggleStatusTodo(req, res){
        try{
            let todoId =req.body.todoId
            let boardId =  req.body.boardId
            let board =  await Board.findOne({_id:boardId})
            let indexTodo = board.todosList.findIndex((todo) =>  todo._id == todoId)
            board.todosList[indexTodo].done = !board.todosList[indexTodo].done
            let newBoard = new Board(board)
            await newBoard.save()
            res.status(200).send('ok')
        }
        catch (e){
            console.log(e)
            res.status(400)
        }

    }
    async updateColumnForTodo(req, res){
        try{
            let todoId =req.body.todoId
            let boardId =  req.body.boardId
            let board =  await Board.findOne({_id:boardId})
            let boardInd = board.todosList.findIndex(item => item._id == todoId)
            board.todosList[boardInd].column = req.body.column
            let newBoard = new Board(board)
            await newBoard.save()
            res.status(200).send('ok')
        }
        catch (e){
            res.status(400).send('Error')
            console.log(e)
        }
    }
    async deleteTodo(req, res){
        try{
            let todoId =req.body.todoId
            let boardId =  req.body.boardId
            let board =  await Board.findOne({_id:boardId})
            board.todosList = board.todosList.filter(item => item._id != todoId)
            let newBoard = new Board(board)
            await newBoard.save()
            res.status(200).send('ok')
        }
        catch (e){
            res.status(400).send('Error')
            console.log(e)
        }
    }

    async getTaskForBoards(req, res){
     try{

      let idBoard = req.body.id
      let tasks = await Board.find({_id:idBoard})
         if(tasks[0]){
             res.send(tasks[0])
         }
         else res.send([])
     }
     catch (e){
         console.log(e)
         res.status(400)
     }
    }
    async addAccess(req, res){
        try{
            const idUser = req.body.idUser
            const idBoard = req.body.idBoard
            let board = await Board.findOne({_id:idBoard})
            console.log(board)
            if(board.accessUser.includes(idUser)){
               return res.status(403).send('User includes')
            }
            board.accessUser.push(idUser)
            let newBoard= new Board(board)
            await newBoard.save()
            board.todosList=[]
            await User.updateOne({_id:idUser},{$push: { 'boards':board }})
            res.status(200).send('OK')
        }
        catch (e){
            console.log(e)
            res.send('Err')
        }
    }
    async deleteBoard(req, res){
        try{
            const idBoard = req.body.id
            let user = await User.findOne({_id:req.query.id})
            user.boards = user.boards.filter(item => item._id != idBoard)
            let newUser = new User(user)
            newUser.save()
            res.send('Success')
            await this.getBoards()
        }
        catch (e){
            console.log(e)
            res.send('Err')
        }
    }
    async assignUserOnTask(req, res){
        try{
            let todoId =req.body.todoId
            const idUser = req.body.idUser
            const idBoard = req.body.idBoard
            let board = await Board.findOne({_id:idBoard})
            if(board.accessUser.includes(idUser)){
                const user =  await User.findOne({_id:idUser})
                console.log(board)
                let indTodo = await board.todosList.findIndex(item => item._id == todoId)
                board.todosList[indTodo].assignUser = user
                let newBoard = new Board(board)
                await newBoard.save()
                return res.send('Add User')
            }
            res.status(403).send("This user don't need access" )
        }
        catch (e){
            console.log(e)
            res.send('Err')

        }
    }
    async addBoard(req, res){
        try{
            const columns = req.body.columns
            const idUser = req.query.id
            const name = req.body.name
            const board =new Board({name, columns})
            await User.updateOne({_id:idUser},{$push: { 'boards':board }})
            let boardId = await User.find({_id:idUser})
            let boardAuthor = boardId[0].username
            boardId = boardId[0].boards.slice(-1)._id
            board.author = boardAuthor
            board.id = boardId
            const newBoard = new Board(board)
            await newBoard.save()
            return res.status(200).send('board Add')
        }
        catch (e){
            console.log(e)
            res.status(400)
        }

    }

    async addTodo(req, res){
        try {
            const columnTodo = req.body.columns
            const idBoard = req.body.id
            const todo = req.body.todo
            const todos = new Todos({todo, column:columnTodo})
            if(await Board.exists({ _id: idBoard })){
               await Board.updateOne({_id: idBoard}, {$push: {'todosList': todos}})
                return res.send(todos._id)
            }
            else{
                res.status(400).send('No dashboard for this id')
            }

        }
        catch (e){
            console.log(e)
            res.status(400)
        }
    }
}

module.exports = new todoControllers()