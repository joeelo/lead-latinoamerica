const express = require("express");
const Program = require("../models/Program");
const seed = require('../seed/programSeed');
const router = express.Router();


router.get("/programs", async (req, res) => {
	try {
		res.send('works');
	} catch (error) {
		res.send({message: error});
	}
})

router.post("/program/:name", async (req, res) => {
	try {
		const book = req.params.name;
		console.log(book);
		res.send(book);
	} catch (error) {
		console.log(error);
		res.send({message: error});
	}
})

router.post("/programs/seed", async (req, res) => {
	try {
		const response = await Program.insertMany(seed);
		console.log('response', response);
		res.send({message: response});
	} catch (error) {
		console.log(error);
	}
})

module.exports = router;