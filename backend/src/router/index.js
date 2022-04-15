const bookRouter = require('./booking')
const userRouter = require('./user')
<<<<<<< HEAD


function route(app){
    app.use('/booking', bookRouter)

    app.use('/trangchu',userRouter)
=======
const companyRouter = require('./company')
const carRouter = require('./car')
const driverRouter = require('./driver')
const typeCarRouter = require('./typeCar')

function route(app){
    app.use('/api/trip', bookRouter)
    app.use('/api/user',userRouter)
    app.use('/api/company', companyRouter)
    app.use('/api/car', carRouter)
    app.use('/api/driver', driverRouter)
    app.use('/api/typecar', typeCarRouter)
>>>>>>> a06811a (Upload V2)
}
module.exports = route