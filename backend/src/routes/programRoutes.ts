import { SESClient, SendEmailCommand } from '@aws-sdk/client-ses'
import express from 'express'
import Program from '@/models/Program'
import User from '@/models/User'
import getAwsEmailContent from '@/email/getAwsEmailContent'
import { translateText } from '@/translation/translator'

const router = express.Router()

const logError = (error: any) => {
  console.error(error)
  console.log(JSON.stringify(error))
}

const SES_CONFIG = {
  credentials: {
    accessKeyId: process.env.S3_ACCESS_SECRET,
    secretAccessKey: process.env.S3_ACCESS_KEY,
  },
  region: 'us-west-2',
}

// @ts-ignore
const client = new SESClient(SES_CONFIG)

const isLocalEnv = process.env.DEPLOY_ENV === 'local'

router.get('/programs', async (_req, res) => {
  try {
    const programs = await Program.find({
      approved: true,
    }).lean()

    res.send({ message: programs })
  } catch (error) {
    logError(error)
    res.send({ success: false, message: error })
  }
})

router.post('/programs', async (req, res) => {
  try {
    const {
      name,
      bio,
      helpsWith,
      partnerUrl,
      programType = {},
      expirationDate,
    } = req.body

    console.log(req.body)

    const href = name.split(' ').join('-').toLowerCase()

    const programTypeKeys = Object.keys(programType)
    const programTypes = {} as any

    programTypeKeys.forEach((key) => (programTypes[key] = !!programType[key]))

    const betweenZeroAndFour = () => Math.floor(Math.random() * 5)

    const images = [
      'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80',
      'https://images.unsplash.com/photo-1532294220147-279399e4e00f?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
      'https://images.unsplash.com/photo-1630025326456-1d384d371b24?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1748&q=80',
      'https://images.unsplash.com/photo-1527484583355-9c200f59f0fd?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
    ]

    const translatedText = await translateText(bio)

    const newProgram = new Program({
      name,
      bio,
      bioEs: translatedText[0],
      helpsWith,
      href,
      partnerUrl,
      expirationDate,
      programType: programTypes,
      coverImage: images[betweenZeroAndFour()],
    })

    const savedProgram = await newProgram.save()

    console.log(savedProgram)

    if (savedProgram) {
      res.send(savedProgram)
    }
  } catch (error) {
    logError(error)
    res.send({ success: false, message: error })
  }
})

router.get('/programs/:href', async (req, res) => {
  try {
    const program = await Program.findOne({
      href: req.params.href,
    }).lean()

    if (!program) {
      res.send({
        message: 'We could not find that program',
      })

      return
    }

    res.send(program)
  } catch (error) {
    logError(error)
    res.send({ success: false, message: error })
  }
})

router.get('/new-programs', async (req, res) => {
  try {
    res.send({ success: true, message: '' })
  } catch (error) {
    logError(error)
    res.send({ success: false, message: error })
  }
})

router.get('/programs/resources', async (req, res) => {
  try {
    const { programType } = req.query
    const key = `programType.${programType}`
    const programs = await Program.find({
      [key]: true,
      approved: true,
    }).lean()

    res.send({ success: true, message: programs })
  } catch (error) {
    logError(error)
    res.send({ success: false, message: error })
  }
})

router.put('/program/edit/:href/:approve', async (req, res) => {
  const filter = { href: req.params.href }

  const program = await Program.findOne({ ...filter })
  const hasEmailBeenSent = await !!program.approvalEmailSent
  const update = { approved: req.params.approve, approvalEmailSent: true }
  const options = {
    returnOriginal: false,
    strict: false,
  }

  try {
    const updatedProgram = await Program.findOneAndUpdate(
      filter,
      update,
      options,
      (error: any) => {
        if (error) {
          logError(error)
          res.send({ success: false, message: error })
        }
      }
    )

    // only look for users if the email hasn't been sent to save a call.
    if (!hasEmailBeenSent) {
      const programArr = []

      const { summer, internship, scholarship, program } =
        updatedProgram.programType

      if (summer) {
        programArr.push('summer')
      }

      if (internship) {
        programArr.push('internship')
      }

      if (scholarship) {
        programArr.push('scholarship')
      }

      if (program) {
        programArr.push('program')
      }

      const users = await User.find({ interests: { $in: programArr } }).lean()
      const userEmails = !isLocalEnv
        ? users.map((user: any) => user.email)
        : ['joeephus@gmail.com']
    }

    res.send({
      message: 'success',
      program: updatedProgram,
    })
  } catch (error) {
    logError(error)
    res.send({ error: true, message: error })
  }
})

router.put('/program/edit/:href', async (req, res) => {
  try {
    const { href } = req.params
    const newHref = req.body.name.split(' ').join('-').toLowerCase()
    const filter = { href }
    const update = { ...req.body, href: newHref }
    const options = {
      returnOriginal: false,
      strict: false,
    }

    const updatedProgram = await Program.findOneAndUpdate(
      filter,
      update,
      options
    )

    res.send({
      success: true,
      message: 'success',
      data: { ...updatedProgram, href: newHref },
    })
  } catch (error) {
    logError(error)
    res.send({ error: true, message: error })
  }
})

router.delete('/programs/erase-all', async (_, res) => {
  try {
    const response = await Program.deleteMany({})

    res.send({ message: 'Succesfully Deleted', response })
  } catch (error) {
    logError(error)
    res.send({ message: error })
  }
})

router.post('/programs/submit/test', async (req, res) => {
  const { program } = req.body

  try {
    const emailContent = getAwsEmailContent(program)

    const command = new SendEmailCommand(emailContent)
    const response = await client.send(command)

    res.send({ message: response })
  } catch (error) {
    console.log(error)

    res.send({ message: error })
  }
})

const programRoutes = router

export { programRoutes }
