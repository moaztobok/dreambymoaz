const mongoose = require('mongoose');
const   projectSchema = mongoose.Schema({
    _id : mongoose.Schema.Types.ObjectId,
    
    clientName:{type: String},

    clientEmail: {type :String, 
        required : true, 
        match: /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
    },

    projectDetails: {type:String, required: true}
    }
    )
module.exports = mongoose.model('Project', projectSchema);