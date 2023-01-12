const mongoose = require('mongoose');
//mongoose.connect('mongodb://127.0.0.1/PollingSystemAPI');

mongoose.connect(
    process.env.mongodburl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
);
const db = mongoose.connection;

db.on('error',console.log.bind(console,'error on connecting to the database'));
db.once('open', function(){
    console.log('successfully connected to the database...');
});