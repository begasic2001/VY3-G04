const mongoose = require('mongoose');
const dotenv = require("dotenv");
dotenv.config({path:'src/.env'});

async function connect(){
    try{
        await mongoose.connect(process.env.MONGO
        ,() =>{
            console.log("Kết nối thành công")
        }   
        );  
       
    }
    catch{
        console.log("Kết nối thất bại")
    }
}

module.exports = {connect}