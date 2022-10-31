const express = require('express');
const Program = require('../models/Program');
const seed = require('../seed/programSeed');
const router = express.Router();
const sendMail = require('../email/sendGrid');

router.post('/programs/add', async (req, res) => {
  try {
    const {
      name,
      bio,
      helpsWith,
      partnerUrl,
      programType = {},
      expirationDate,
    } = req.body;

    const href = name.split(' ').join('-').toLowerCase()

    const programTypeKeys = Object.keys(programType);
    const programTypes = {}; 
    
    programTypeKeys.forEach((key) => programTypes[key] = !!programType[key]);

    const betweenZeroAndFour = () => {
      return Math.floor(Math.random() * 5)
    }

    const images = [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80', 
      'https://images.unsplash.com/photo-1532294220147-279399e4e00f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', 
      'https://images.unsplash.com/photo-1630025326456-1d384d371b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80', 
      'https://images.unsplash.com/photo-1527484583355-9c200f59f0fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80', 
    ]
    
    const newProgram = new Program({
      name,
      bio,
      helpsWith,
      href,
      partnerUrl,
      expirationDate,
      programType: programTypes,
      coverImage: images[betweenZeroAndFour()]
    });

    const savedProgram = await newProgram.save();

    if (savedProgram) {
      await sendMail(req.body, href)
      res.send({ success: true, message: 'success' })
    } 
  } catch (error) {
    res.send({ 
      errorMessage: error._message, 
      error: true, 
      success: false 
    });
  }
});

router.get('/program/:href', async (req, res) => {
  try {
    // eslint-disable-next-line
    console.log('href: ', req.params.href);

    const program = await Program.findOne({
      href: req.params.href,
    });

    if (!program) {
      res.send({
        message: 'We could not find that program',
      });

      return;
    }

    res.send({ message: 'success', program });
  } catch (error) {
    console.log('ERROR IN PROGRAM/:HREF ', error);
  }
});

router.get('/programs/resources', async (req, res) => {
  try {
    const { programType } = req.query;
    const key = `programType.${programType}`;
    const programs = await Program
    .find({
      [key]: true,
      approved: true,
      expirationDate: { $gt: new Date().toISOString() }
    })

    res.send({ message: programs });
  } catch (error) {
    // eslint-disable-next-line
    console.log('PROGRAMS ERROR: ', error);
    res.send({ message: error });
  }
});

router.get('/programs', async (req, res) => {
  try {
    const programs = await Program.find({});

    res.send({ message: programs });
  } catch (error) {
    // eslint-disable-next-line
    console.log('PROGRAMS ERROR: ', error);
    res.send({ message: error });
  }
});

router.post('/programs/seed', async (req, res) => {
  try {
    const response = await Program.insertMany(seed);

    // eslint-disable-next-line
    console.log('response', response);
    res.send({ message: response });
  } catch (error) {
    // eslint-disable-next-line
    console.log(error);
  }
});

router.put('/program/edit/:href/:approve', async (req, res) => {
  const filter = { href: req.params.href };
  const update = { approved: req.params.approve };
  const options = {
    returnOriginal: false,
    strict: false,
  };

  try {
    const updatedProgram = await Program.findOneAndUpdate(
      filter,
      update,
      options,
      (error) => {
        if (error) {
          // eslint-disable-next-line
          console.log('ERROR IN UPDATED PROGRAM: ', error);
          res.send({ message: error, error: true });
        }
      }
    );

    res.send({
      message: 'success',
      program: updatedProgram,
    });
  } catch (error) {
    console.log('ERROR UPDATING: ', error);
    res.send({ error: true, message: error });
  }
});

router.put('/program/edit/:href', async(req, res) => {
  try {
    const { href } = req.params
    const newHref = req.body.name.split(' ').join('-').toLowerCase()
    const filter = { href }
    const update = {...req.body, href: newHref}
    const options = {
      returnOriginal: false,
      strict: false,
    };

    const updatedProgram = await Program.findOneAndUpdate(
      filter,
      update,
      options,
    );

    res.send({ success: true, message: 'success', data: {...updatedProgram, href: newHref } })

  } catch (error) {
    console.log('error editing program', error)

    res.send({error: true, message: error})
  }
})

router.delete('/programs/erase-all', async (_, res) => {
  try {
    const response = await Program.deleteMany({});

    res.send({ message: 'Succesfully Deleted', response });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
});

router.post('/email/test', async (req, res) => {
  try {
    console.log('POST EMAIL', req.body);
    
    const emailResponse = await sendMail(req.body, req.body.href); 
    res.send({message: 'success', email: emailResponse});
  } catch (error) {
    console.log('ERROR: ', error); 

    res.send({error: true, message: error});
  }
})

module.exports = router;