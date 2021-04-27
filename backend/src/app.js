const express = require("express");
const app = express();
const router = express.Router();
const userRoutes = require("./routes/userRoutes");
const bookRoutes = require("./routes/bookRoutes");
const reviewRoutes = require("./routes/reviewRoutes");
const noteRoutes = require("./routes/noteRoutes");

const bodyParser = require("body-parser");
require("dotenv").config();
const cors = require("cors");

require("./mongoose/mongooseDB");

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const port = process.env.PORT || 3000;

app.use(userRoutes);
app.use(reviewRoutes);
app.use(bookRoutes);
app.use(noteRoutes);

app.listen(port, () => {
    console.log("listening on port " + process.env.PORT);
})