const express = require('express');
const Program = require('../models/Program');
const seed = require('../seed/programSeed');
const { upload } = require('../aws/upload');
const router = express.Router();
const sendMail = require('../email/sendGrid');
const { replaceSingleCharGlobal } = require('../customFuncs/replaceSingleCharGlobal');

// https://philna.sh/blog/2016/06/13/the-surprise-multipart-form-data/
// https://github.com/expressjs/multer/issues/799
router.post('/programs/add', upload.single('file'), async (req, res) => {
  try {
    const {
      organization,
      bio,
      helpsWith,
      coverImage,
      email,
      missionStatement,
      signUpLink,
      partnerUrl,
      programType = {},
    } = req.body;

    let link; 

    if (req.file) {
      link = req.file.location; 
    }

    let href = replaceSingleCharGlobal(organization, ' ', '-');
    href = href.toLowerCase();

    const programTypeKeys = Object.keys(programType);
    const programTypes = {}; 

    const helpsWithArray = JSON.parse(helpsWith);
    
    programTypeKeys.forEach((key) => programTypes[key] = true);
    
    const newProgram = new Program({
      organization,
      bio,
      helpsWith: helpsWithArray,
      coverImage,
      orgLogo: link,
      email,
      href,
      missionStatement,
      signUpLink,
      partnerUrl,
      programType: programTypes,
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
    
    await sendMail(newProgram, newProgram.href);
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
