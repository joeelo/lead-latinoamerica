const mongoose = require('mongoose');

const server = `mongodb+srv://joeeloee:${process.env.DB_PASSWORD}@cluster0.nnv78.mongodb.net/lead-latinoamerica?retryWrites=true&w=majority`;
// const database = 'lead-latinoamerica';

mongoose.connect(server, {
  useCreateIndex: true,
  useNewUrlParser: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
  ssl: true,
});
