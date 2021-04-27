const express = require("express");
const router = express.Router();
const Book = require("../models/Book");
const User = require("../models/User");
const Review = require("../models/Review");
const fetch = require("node-fetch");


router.get("/book/:bookTitle", async (req, res) => {
    try {
        const book = req.params.bookTitle;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.GOOGLE_BOOKS_API}&country=US`;
        const response = await fetch(url);
        console.log(url);
        console.log('RESPONSE: ', response);
        const json = await response.json();
        res.send(json.items);
    } catch (error) {
        res.status(400).send(error);
    }
})

router.get("/book/categories/:category", async (req, res) => {
    try {
        res.send({message: "working"});
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/book/id/:id", async (req, res) => {
    try {
        const book = req.params.id;
        const url = `https://www.googleapis.com/books/v1/volumes?q=${book}&key=${process.env.GOOGLE_BOOKS_API}`;
        const response = await fetch(url);
        const json = await response.json();
        const foundBook = await Book.findOne({ "any.id": req.body.book });
        if (foundBook) {
            const reviews = await foundBook.populate("reviews").execPopulate()
            return res.send({data: json.items[0], reviews: reviews});
        } else {
            return res.send({ data: json.items[0], reviews: []});
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/books", async (req, res) => {
    try {  
        const foundBook = await Book.findOne({"any.id": req.body.any.id, user: req.body.user.id});
        const user = await User.findOne({_id: req.body.user.id});
        if (foundBook) {
            foundBook.finished = true;
            await foundBook.save();
            res.send({message: "already saved to DB and user"});    
        } else {
            const { any, finished } = req.body;
            const { id } = req.body.user;
            const book = { any, user: id, finished };
            const newBook = await Book.create(book);
            user.books.push(newBook._id), await user.save();
            res.send(book);
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

router.patch("/book/:id", async (req, res) => {
	try {
		const book = await Book.findOne({_id: req.params.id}, (err, book) => {
			book.set(req.body);
			book.save((err, newbook) => {
				if (err) {
					res.send(err);
				}
					res.send(newBook);
				})
		})
	} catch (error) {
			res.status(400).send(error);
	}
})

router.put("/rating", async (req, res) => {
    try {
        const foundBook = await Book.findOne({ "any.id": req.body.book.id, user: req.body.user.id});
        const user = await User.findById(req.body.user.id);
        if (foundBook) {
            foundBook.rating = req.body.rating;
            await foundBook.save();
            user.books.push(foundBook);
            await user.save();
            return res.send({message: "updated rating!", foundBook});
        } else {
            let newBook = new Book();
            newBook.any = req.body.book;
            newBook.user = req.body.user.id;
            newBook.rating = req.body.rating;
            await newBook.save();
            user.books.push(newBook);
            await user.save();
            res.send({message: "created book and rating!", newBook});
        }
    } catch (error) {
        console.log(error);
        res.status(400).send(error);
    }
})


module.exports = router;
