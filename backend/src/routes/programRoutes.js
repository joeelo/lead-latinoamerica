const express = require("express");
const router = express.Router();

router.get("/programs", async (req, res) => {
	try {
		res.send({req, res});
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
	}
})

module.exports = router;