const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const profile = new Schema({

    auth_details: {
        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true
        },
        email: {
            type: String,
            ref: 'User',
            required: true
        }
    },
    name: {type: String,required: true},
    last_name: {type: String, required: true},
    phone_number: {type: String,required: true},
    vehicle_type: {type: String,required: true},
    vehicle_maker: {type: String,required: true},
    vehicle_model: {type: String,required: true},
    vehicle_plate: {type: String,required: true},
    profile_image: {type: String,required: true}
});

module.exports = mongoose.model('Profile', profile);