const express = require('express');
const Program = require('../models/Program');
const seed = require('../seed/programSeed');
const { upload } = require('../aws/upload');

const router = express.Router();
const sendMail = require('../email/sendGrid');
// eslint-disable-next-line prettier/prettier
const { replaceSingleCharGlobal } = require('../customFuncs/replaceSingleCharGlobal');

// https://philna.sh/blog/2016/06/13/the-surprise-multipart-form-data/
router.post('/programs/add', upload.single('file'), async (req, res) => {
  try {
    const {
      organization,
      bio,
      helpsWith,
      coverImage,
      email,
      file,
      missionStatement,
      signUpLink,
      partnerUrl,
      programType = {},
      query = {},
    } = req.body;

    console.log('uploaded', req.body)

    res.send({success: true, message: 'yes', body: organization})

    return
    let href = replaceSingleCharGlobal(organization, ' ', '-');
    href = href.toLowerCase();


    const helpsWithArr = helpsWith.split(',');
    // const emailResponse = await sendMail(data, href);

    const programTypeArr = [];
    const programKeys = Object.keys(programType);
    programKeys.forEach((pk) => {
      if (!!programType[pk]) {
        programTypeArr.push(programType[pk]);
      } 
    })

    const newProgram = new Program({
      organization,
      bio,
      helpsWith: helpsWithArr,
      coverImage,
      email,
      href,
      missionStatement,
      signUpLink,
      partnerUrl,
      programType: programTypeArr,
    });

    await newProgram.save((err) => {
      if (err) {
        console.log('ERROR IN PROGRAM SAVE FUNCTION: ', err);
        res.send({ message: 'something went wrong', err });

        return null;
      }

      console.log('saved');

      return { message: 'saved' };
    });
    res.send({ message: 'success' });
  } catch (error) {
    console.log('ERROR ON PROGRAMS/ADD ROUTE', error);
    res.send({ message: error, error: true });
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
    // eslint-disable-next-line
    console.log('ERROR IN PROGRAM/:HREF ', error);
  }
});

router.get('/programs/resources', async (req, res) => {
  try {
    const { programType } = req.query;
    const key = `programType.${programType}`;
    const programs = await Program.find({
      [key]: true,
      approved: true,
    });

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

router.patch('/program/edit/:href/:approve', async (req, res) => {
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

router.delete('/programs/erase-all', async (req, res) => {
  try {
    const response = await Program.deleteMany({});

    res.send({ message: 'Succesfully Deleted', response });
  } catch (error) {
    console.log(error);
    res.send({ message: error });
  }
});

module.exports = router;
