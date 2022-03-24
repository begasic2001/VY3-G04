const mongoose = require('mongoose');

async function connect(){
    try{
        await mongoose.connect('mongodb://localhost:27017/Booking', 
        );  
        console.log("Kết nối thanh công")
    }
    catch{
        console.log("Kết nối thất bại")
    }
}

module.exports = {connect}