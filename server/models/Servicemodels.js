const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const ServiceSchema = new Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    description: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
   
    createdAt: {
        type: Date,
        default: Date.now
    }
});
module.exports = mongoose.model('Service', ServiceSchema);