const mongoose = require("mongoose");

const contactSchema = mongoose.Schema ({
    name:{
        type:String
    }
})

const ContactModel = mongoose.model('contact',contactSchema)   // collection name , schema
module.exports = ContactModel