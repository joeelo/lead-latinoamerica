require('dotenv').config();

const express = require('express');
const formidable = require('express-formidable');
const multer = require('multer');
const app = express();
const cors = require('cors');
const userRoutes = require('./routes/userRoutes');
const programRoutes = require('./routes/programRoutes');

require('./mongoose/mongooseDB');

// https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const port = process.env.PORT || 9000;

app.get('/ping', (req, res) => res.send('pinged'));

app.use(userRoutes);
app.use(programRoutes);

app.listen(port, () => {
  console.log(`listening on port ${port}`);
});
