const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Review = require("../models/Review");

router.post("/users/sign-up", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email, password: req.body.password});
        console.log(user);
        if (user) {
            res.send({message: "user already exists please check and try again"});
            return;
        } else {
            const newUser = new User();
            newUser.name = req.body.name, newUser.username = req.body.username, newUser.email = req.body.email, newUser.password = req.body.password;
            await newUser.save();
            console.log(newUser);
            res.send(newUser)
        }
    } catch (error) {
        res.status(400).send(error);
    }
})

router.post("/users/login", async (req, res) => {
    try {
        const user = await User.findOne({email: req.body.email, password: req.body.password});
        console.log(user);
        if (user) {
            res.send(user);
        } else {
            res.send({message: "wrong login info try again"});
        } 
    } catch (error) {
        res.send(error)
    }
})

router.get("/user/show/:id", async (req, res) => {
    try {
        // TODO: Make sure whole user object is not being sent back;
        const user = await User.findOne({ _id: req.params.id })
        .populate("books")
        .exec();
        res.send(user);
    } catch (error) {
        res.status(400).send(error); 
    }
})

router.patch("/user/profile/edit", async (req, res) => {
    const {id, name, email, username} = req.body;
    const modifications = {};
    modifications.name = name;
    modifications.email = email;
    modifications.username = username;
    try {
        const user = await User.findOneAndUpdate(
            id, 
            { $set: modifications }, 
            { new: true }
        );
        res.send(user);
    } catch (error) {
        res.status(400).send(error);
    }
})

module.exports = router