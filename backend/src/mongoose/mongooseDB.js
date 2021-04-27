const mongoose = require("mongoose");

const server = '127.0.0.1:27017'; 
const database = "book-list"; 

mongoose.connect(`mongodb://${server}/${database}`, 
{
    useCreateIndex: true, 
    useNewUrlParser: true, 
    useFindAndModify: false
});
