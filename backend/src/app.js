require('dotenv').config();

const express = require('express');
const formidable = require('express-formidable');

const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const programRoutes = require('./routes/programRoutes');


require('./mongoose/mongooseDB');

app.use(cors());
app.use(express.json());
// https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/public', express.static('public'));
app.use(formidable());

const port = process.env.PORT || 9000;

app.get('/ping', (req, res) => res.send('pinged'));

app.use(userRoutes);
app.use(programRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
