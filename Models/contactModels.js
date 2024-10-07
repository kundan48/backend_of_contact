const mongoose = require('mongoose');

// Define a schema for your model
const contactSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "please add the contact name"], 
    },
    age: {
        type: Number,
        required: false,   
    },
    mob: {
        type: String,
        required: [true, "please add the contact mobile number"],  
    },
    email: {
        type: String,
        required: [true, "please add the contact email"],  
    },
},
{
    timestamps: true 
});

// Create a model based on the schema
const Contact = mongoose.model('Contact', contactSchema);

module.exports = Contact;
