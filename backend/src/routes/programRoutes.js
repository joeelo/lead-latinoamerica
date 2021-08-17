const express = require("express");
const Program = require("../models/Program");
const seed = require('../seed/programSeed');
const router = express.Router();
const sendMail = require('../email/sendGrid');
const { replaceSingleCharGlobal } = require('../customFuncs/replaceSingleCharGlobal');

router.post("/programs/add", async (req, res) => {
	try {
		const data = req.body;		
		const { organization, bio, helpsWith, coverImage, email, overview } = req.body;
		let href = replaceSingleCharGlobal(organization, ' ', '-');
		href = href.toLowerCase(); 
		console.log('href: ', href);
		const helpsWithArr = helpsWith.split(',');
		const emailResponse = await sendMail(data, href);
		const newProgram = new Program({ organization, bio, helpsWith: helpsWithArr, coverImage, email, href, overview });
		console.log('NEW PROGRAM: ', newProgram); 
		await newProgram.save((err) => {
			if (err) {
				console.log('ERROR IN PROGRAM SAVE FUNCTION: ', err);
				res.send({ message: 'something went wrong', err });
				return null;
			}
			console.log('saved');
		})
		res.send({ message: 'success' });
	} catch (error) {
		console.log('ERROR ON PROGRAMS/ADD ROUTE', error);
		res.send({ message: error, error: true });
	}
})

router.get('/program/:href', async (req, res) => {
	try {
		const program = await Program.findOne({ href: req.params.href });
		if (!program) {
			res.send({ message: 'We could not find that program'})
		}
		res.send({ message: 'success', program: program }); 
	} catch (error) {
		console.log('ERROR IN PROGRAM/:HREF ', error);
	}
})

router.get("/programs", async (req, res) => {
	try {
		const programs = await Program.find({});
		res.send({ message: programs });
	} catch (error) {
		console.log('PROGRAMS ERROR: ', error);
		res.send({message: error});
	}
})

router.post("/programs/seed", async (req, res) => {
	try {
		const response = await Program.insertMany(seed);
		console.log('response', response);
		res.send({ message: response });
	} catch (error) {
		console.log(error);
	}
})

router.delete("/programs/erase-all", async (req, res) => {
	try {
		const response = await Program.deleteMany({});
		res.send({ message: 'Succesfully Deleted', response });
	} catch (error) {
		console.log(error);
		res.send({ message: error });
	}
})

module.exports = router;