const express = require("express");
const router = express.Router();


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