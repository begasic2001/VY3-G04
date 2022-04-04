module.exports = {
    mulBookingToOject : function(bookings){
        return bookings.map( booking => booking.toObject())
    },
    BookingToOject : function(bookings){
        return bookings ? bookings.toObject() : bookings
    }
}