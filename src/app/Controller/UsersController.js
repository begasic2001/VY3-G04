const User = require('../Model/user.js')
const Booking = require('../Model/Booking.js')
const { mulBookingToOject }= require('../../ultils/mongooes')
const { BookingToOject }= require('../../ultils/mongooes')

class UsersController{
   
    index(req,res,next){
        Booking.find({})
            .then(bookings => res.render('user/user-search',{
                // res.json(bookings)
                bookings: mulBookingToOject(bookings)
            }))
      
    }
   
}
module.exports = new UsersController()

