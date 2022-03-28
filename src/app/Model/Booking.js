const mongoose = require('mongoose');
const slug = require('mongoose-slug-generator');
const Schema = mongoose.Schema;
mongoose.plugin(slug);

const Booking = new Schema({
    trip_details: {
        pickup_location: {type: String, required: true},
        dropoff_location: {type: String, required: true},
        pickup_date: {type: String, required: true},
        pickup_time: {type: String, required: true},
        flight_number: {type: String, required: true},
        passengers_count: {type: Number, required: true},
        suitcases_count: {type: Number, required: true},
        roundtrip: {type: Boolean},
        rt_pickup_location: {type: String},
        rt_dropoff_location: {type: String},
        rt_pickup_date: {type: String},
        rt_pickup_time: {type: String},       
        rt_flight_number: {type: String},
        image: {type:String},
    },
    vehicle: {
        selected_vehicle: {type: String, required: true},
        price: {type: Number, required: true}
    },
    options: {
        baby_seats: {type: Number, required: true},
    },
    comments: {type: String},
    send_communications: {type: Boolean},
  
    slug:{type:String , slug: "trip_details.pickup_location",unique:true}
    // contact_info: {
    //     name: {type: String},
    //     email: {
    //         type: String,
    
    //         match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
    //     },
    //     phone_number: {type: String},
    //     country: {type: String}      
    // },   
   
    // agree_to_terms: {type: Boolean},
    // payment_details: {
    //     payment_type: {type: String},
    //     payment_method: {type: String},
    //     discount_code: {type: String},
    //     deposit_amount: {type: Number},
    //     total_price: {type: Number},
    //     in_car_payment: {type: Number}
    // },
    // booking_date: {type: Date},
    // update_date: {type: Date},
    // booking_status: {
    //     received: {type: Boolean},
    //     scheduled: {type: Boolean},
    //     assigned: {type: Boolean},
    //     completed: {type: Boolean}
    // },
    // assigned_to: {type: Object},
       
  },{
      timestamps: true,
  });

  module.exports = mongoose.model('Booking', Booking);