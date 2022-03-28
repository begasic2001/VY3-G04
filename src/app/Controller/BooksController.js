
const Booking = require('../Model/Booking')
const multer = require('multer')
const { mulBookingToOject }= require('../../ultils/mongooes')
const { BookingToOject }= require('../../ultils/mongooes')
// const {conn, sql} = require('../../config/db/sql')
class BooksController{
    index(req,res,next){
        // mongo
        Booking.find({})
        .then(bookings => {     
            res.render('partners/home',{
                // res.json(bookings)
                bookings: mulBookingToOject(bookings)
            })
        })
        .catch(next)
        // res.render('partners/home')

        // mssql
        // const pool =  await conn
        // const ressult = "SELECT * FROM trip_details"
        // return await pool.request().query(ressult,function(err,data){
        //     res.render('partners/home',{
        //         data : mulBookingToOject(data)
        //     })
        // })
           
         

    }
    show(req,res,next){
        Booking.findOne({slug:req.params.slug})
        .then(bookings => {
           //res.json(bookings)
           res.render('partners/detail',{
               bookings: BookingToOject(bookings)
           })
        })
        .catch(next)
        // res.send("Detail booking" + req.params.slug)
        // res.render('partners/detail')
    }
    //[GET] booking/create
    create(req,res,next){

        res.render('partners/create')
    }

    //[POST] booking/store
    store(req,res,next){
    
        
        const file = req.file
        // console.log(file)
        // res.json("Upload thành công")
        const formData =req.body
    const resRoundTrip = roundtrip => formData.roundtrip ==="on"
    ? true : false
       

//If it is roundtrip then the return pickup location = arrival dropoff location
const rt_pickup_location = roundtrip => roundtrip
    ? formData.dropoff_location
    : "";

//If it is roundtrip then the return dropoff location = arrival pickup location
const rt_dropoff_location = roundtrip => roundtrip
    ? formData.pickup_location
    : "";
  
        const booking = new Booking({
            trip_details:{
                pickup_location: formData.pickup_location,
                dropoff_location: formData.dropoff_location,
                pickup_date: formData.pickup_date,
                pickup_time: formData.pickup_time,
                flight_number: formData.flight_number,
                passengers_count: formData.passengers_count,
                suitcases_count: formData.suitcases_count,
                roundtrip: resRoundTrip(formData.roundtrip),
                rt_pickup_location: rt_pickup_location(formData.roundtrip),
                rt_dropoff_location: rt_dropoff_location(formData.roundtrip),
                rt_pickup_date: formData.rt_pickup_date,
                rt_pickup_time: formData.rt_pickup_time,
                rt_flight_number: formData.rt_flight_number,
                image: file.filename
            },
            vehicle:{
                selected_vehicle: formData.selected_vehicle,
                price: formData.price,
            },
            options:{
                baby_seats: formData.baby_seats,
            },
            comments: formData.comments,
            send_communications: formData.send_communications, 
        });
      
        booking.save()
        res.redirect('/booking')
    }
    // [GET] booking/:id/edit
    edit(req,res,next){
        Booking.findById(req.params.id)
        .then(bookings => res.render('partners/edit',{
            bookings: BookingToOject(bookings)
        }))
        .catch(next)
        // res.render('partners/edit')
    }
    // [PUT] booking/:id/
    update(req,res,next){
        const file = req.file
        const formData =req.body
        const resRoundTrip = roundtrip => formData.roundtrip ==="on"
        ? true : false

//If it is roundtrip then the return pickup location = arrival dropoff location
const rt_pickup_location = roundtrip => roundtrip
    ? formData.dropoff_location
    : "";

//If it is roundtrip then the return dropoff location = arrival pickup location
const rt_dropoff_location = roundtrip => roundtrip
    ? formData.pickup_location
    : "";
        Booking.findOneAndUpdate({_id:req.params.id},{
            trip_details:{
                pickup_location: formData.pickup_location,
                dropoff_location: formData.dropoff_location,
                pickup_date: formData.pickup_date,
                pickup_time: formData.pickup_time,
                flight_number: formData.flight_number,
                passengers_count: formData.passengers_count,
                suitcases_count: formData.suitcases_count,
                roundtrip: resRoundTrip(formData.roundtrip),
                rt_pickup_location: rt_pickup_location(formData.roundtrip),
                rt_dropoff_location: rt_dropoff_location(formData.roundtrip),
                rt_pickup_date: formData.rt_pickup_date,
                rt_pickup_time: formData.rt_pickup_time,
                rt_flight_number: formData.rt_flight_number,
                image: file.filename
                
            },
            vehicle:{
                selected_vehicle: formData.selected_vehicle,
                price: formData.price,
            },
            options:{
                baby_seats: formData.baby_seats,
            },
            comments: formData.comments,
            send_communications: formData.send_communications,
            agree_to_terms: formData.agree_to_terms,
        
        })
            .then(() => res.redirect('/booking'))
            .catch(next)
    }
     // [DELETE] booking/:id/
    delete(req,res,next){
        Booking.deleteOne({_id:req.params.id})
            .then(() => res.redirect('back'))
            .catch(next)
    }
}
module.exports = new BooksController()