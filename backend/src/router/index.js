const bookRouter = require('./booking')
const userRouter = require('./user')
const companyRouter = require('./company')
const carRouter = require('./car')
const driverRouter = require('./driver')
const typeCarRouter = require('./typeCar')
const paymentRouter = require('./payment')
const revenueRouter = require('./revenue')
// const apiRouter = require('./api')
function route(app){
    app.use('/api/trip', bookRouter)
    app.use('/api/user',userRouter)
    app.use('/api/company', companyRouter)
    app.use('/api/car', carRouter)
    app.use('/api/driver', driverRouter)
    app.use('/api/typecar', typeCarRouter)
    app.use('/api/payment',paymentRouter)
    app.use('/api/revenue',revenueRouter)
    // app.use('/api', apiRouter)
  
}
module.exports = route