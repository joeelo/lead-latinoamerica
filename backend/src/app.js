const express = require("express");
const app = express();
const router = express.Router();
const userRoutes = require("./routes/userRoutes");
const programRoutes = require("./routes/programRoutes");
const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

require("./mongoose/mongooseDB");

app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

const port = process.env.PORT || 9000;

app.get('/ping', (req, res) => res.send('pinged'));

app.use(userRoutes);
app.use(programRoutes);

app.listen(port, () => {
    console.log("listening on port " + port);
})