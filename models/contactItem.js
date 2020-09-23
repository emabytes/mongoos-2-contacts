const mongoose = require('mongoose');
const Schema = mongoose.Schema

const contactItemSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    imgURL: {
        type: String,
        required: true
    },
}, { timestamps: true })


const ContactItem = mongoose.model("contactsDB", contactItemSchema) //automatically create new collection superDatabase.contactsdbs

module.exports = ContactItem