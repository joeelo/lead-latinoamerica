const express = require("express");
const Program = require("../models/Program");
const seed = require('../seed/programSeed');
const router = express.Router();
const sendMail = require('../email/sendGrid');

router.post("/programs/add", async (req, res) => {
	try {
		const data = req.body;		
		const emailResponse = await sendMail(data);
		console.log('NEW PROGRAM', req.body);
		const { organization, bio, helpsWith, coverImage, email } = req.body;
		const helpsWithArr = helpsWith.split(',');
		const newProgram = new Program({ organization, bio, helpsWith: helpsWithArr, coverImage, email });
		console.log('NEW PROGRAM: ', newProgram); 
		newProgram.save((err) => {
			if (err) {
				console.log('ERROR IN PROGRAM SAVE: ', err);
			}
			console.log('saved');
		})
		res.send({ message: 'success' });
	} catch (error) {
		console.log('ERROR ON PROGRAMS/ADD ROUTE', error);
		res.send({ message: error, error: true });
	}
})

router.get("/programs", async (req, res) => {
	try {
		const programs = await Program.find({});
		res.send({ message: programs });
	} catch (error) {
		res.send({message: error});
	}
})

router.post("/program", async (req, res) => {
	const errors = {};
	console.log(req);
	try {
		if (!req.body.organization) return;
		if (req.body.title.length < 3) {
			errors.titleLength = 'Title Length is too short, must be at least 3 characters.';
		}
		if (Object.keys(errors).length) {
			console.log('WEVE FOUND ERRORS: ', errors);
			res.send({ error: true, message: errors});
			return;
		}
		response = await Program.create(req.body, (error) => {
			if (error) {
				res.send({error: true, message: error._message});
				return;
			}
		})
		res.send({ message: response });
	} catch (error) {
		console.log(error);
		res.send({ message: error });
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