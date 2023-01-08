const mongoose = require('mongoose');

const OptionsSchema = new mongoose.Schema({
    text : {
        type : String,
        required : true,
        unique : true
    },
    votes : {
        type : Number,
        required : true
    },
    link_to_vote : {
        type : String,
        required : true,
        unique : true
    }    
},{
    timestamps : true
});

const Options = mongoose.model('Options',OptionsSchema);

module.exports  = Options;