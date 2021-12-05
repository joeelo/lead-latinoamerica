const express = require('express');

const router = express.Router();
const User = require('../models/User');
const Program = require('../models/Program');


router.post('/users/sign-up', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      res.send({
        message: 'user already exists please check and try again',
      });

      return;
    }

    const newUser = new User();

    newUser.name = req.body.name;
    newUser.username = req.body.username;
    newUser.email = req.body.email;
    newUser.password = req.body.password;
    await newUser.save();
    res.send(newUser);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    });

    if (user) {
      res.send(user);
    } else {
      res.send({ message: 'wrong login info try again' });
    }
  } catch (error) {
    res.send(error);
  }
});

router.get('/user/show/:id', async (req, res) => {
  try {
    // TODO: Make sure whole user object is not being sent back;
    const user = await User.findOne({ _id: req.params.id })
      .populate('books')
      .exec();

    res.send(user);
  } catch (error) {
    res.status(400).send(error);
  }
});

router.put('/user/profile/:email/edit', async (req, res) => {

  const { data } = req.body;
  const { email } = req.params;
  const modifications = {};

  const nationalities = Object.keys(data.ethnicity).filter(
    (eth) => !!data.ethnicity[eth]
  );

  const programs = Object.keys(data.programs).filter(
    (p) => data.programs[p]
  );

  modifications.preferredName = data.preferredName; 
  modifications.grade = data.grade; 
  modifications.nationality = nationalities;
  modifications.interests = programs; 
  modifications.pronouns = data.pronouns;

  try {
    const user = await User.findOneAndUpdate(
      email,
      { $set: modifications },
    );

    res.send({success: true, user});

    return;
  } catch (error) {
    res.status(400).send(error);
  }
});

router.post('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({
      email,
    });

    if (!user) {
      const newUser = new User();

      newUser.email = email;
      newUser.name = req.body.user.name;

      await newUser.save();
      res.send({ email, message: 'success', user: newUser });

      return;
    }

    res.send({ email, message: 'success', user });
  } catch (error) {
    console.log('ERROR', error);
  }
});

router.get('/user/programs/:email/:programId', async (req, res) => {
  const { email, programId } = req.params;
  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.send({message: 'you must sign up for an account to save your programs', success: true})
      return; 
    }

    let foundProgram = null; 
    
    if (user.savedPrograms.length) {
      foundProgram = user.savedPrograms.find((id => id == programId));
    }

    if (foundProgram) {
      res.send({ 
      message: 'This program is already saved!', 
      success: true, 
      warningMessage: 'This program is already saved!' 
      }); 

      return; 
    }

    user.savedPrograms.push(programId)
    await user.save(); 

    res.send({ message: 'Program Saved!', success: true });

  } catch (error) {
    console.log('ERROR IN UPDATING SAVED PROGRAMS: ', error);
  }
})

router.get('/user/:email/programs', async (req, res) => {
  try {
    const { email } = req.params;
    const user = await User.findOne({ email });
    const programs = user.savedPrograms; 

    console.log('USER SAVED: ', user.savedPrograms)
    if (programs.length) {
      const records = await Program.find({ '_id': { $in: user.savedPrograms } })

      res.send({ programs: records, success: true });
      return; 
    }

    res.send({ programs: null, success: true });

  } catch (error) {
    console.log('ERROR IN USER GET PROGRAMS: ', error); 
    res.send({ error, success: false })
  }
})

module.exports = router;
