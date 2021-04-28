const mongoose = require("mongoose");

const server = '127.0.0.1:27017'; 
const database = "latino-america"; 

mongoose.connect(`mongodb://${server}/${database}`, 
{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useFindAndModify: false, 
    useUnifiedTopology: true
});
