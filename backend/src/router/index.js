const bookRouter = require('./booking')
const userRouter = require('./user')


function route(app){
    app.use('/booking', bookRouter)

    app.use('/trangchu',userRouter)
}
module.exports = route