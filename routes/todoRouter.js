const Router =require('express');
const todoRouter =new Router();
const {log} = require("nodemon/lib/utils");
const bodyParser =require('body-parser')
const todoControllers = require('../controllers/todoControllers')
const authMiddleware =require('../middleware/authMiddleware')


todoRouter.post('/addBoard', todoControllers.addBoard)
todoRouter.post('/addTodo', todoControllers.addTodo)
todoRouter.post('/addAccess', todoControllers.addAccess)
todoRouter.get('/getBoards',todoControllers.getBoards)
todoRouter.post('/getTodo',  todoControllers.getTaskForBoards )
todoRouter.post('/toggleStatusTodo', authMiddleware, todoControllers.toggleStatusTodo)
todoRouter.post('/assignUser', authMiddleware, todoControllers.assignUserOnTask)
todoRouter.post('/deleteTodo' , todoControllers.deleteTodo)
todoRouter.post('/deleteBoard' , todoControllers.deleteBoard)
todoRouter.post('/updateTodo' , todoControllers.updateColumnForTodo)
module.exports = todoRouter