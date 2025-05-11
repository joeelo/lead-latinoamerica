import express from 'express'
import Program from 'src/models/Program'
import User from 'src/models/User'

const router = express.Router()
const isLocalEnv = process.env.DEPLOY_ENV === 'local'

router.post('/users/sign-up', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })

    if (user) {
      res.send({
        message: 'user already exists please check and try again',
      })

      return
    }

    const newUser = new User()

    newUser.name = req.body.name
    newUser.username = req.body.username
    newUser.email = req.body.email
    newUser.password = req.body.password
    await newUser.save()
    res.send(newUser)
  } catch (error) {
    res.send(error)
  }
})

router.post('/users/login', async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.email,
      password: req.body.password,
    })

    if (user) {
      res.send(user)
    } else {
      res.send({ message: 'wrong login info try again' })
    }
  } catch (error) {
    res.send(error)
  }
})

router.get('/user/show/:id', async (req, res) => {
  try {
    // TODO: Make sure whole user object is not being sent back
    const user = await User.findOne({ _id: req.params.id })
      .populate('books')
      .exec()

    res.send(user)
  } catch (error) {
    res.send(error)
  }
})

router.put('/user/profile/:email/edit', async (req, res) => {
  const { data } = req.body
  const { email } = req.params

  try {
    const user = await User.findOne({ email })

    user.preferredName = data.preferredName || user.preferredName
    user.grade = data.grade || user.grade
    user.pronouns = data.pronouns || user.pronouns
    user.interests = data.interests || user.interests
    user.nationality = data.nationality || user.nationality

    const updatedUser = await user.save()

    res.send({ success: true, user: updatedUser })
  } catch (error) {
    res.send(error)
  }
})

router.post('/profile/:email', async (req, res) => {
  try {
    const { email } = req.params
    const user = await User.findOne({
      email,
    })

    if (!user) {
      const newUser = new User()

      newUser.email = email
      newUser.name = req.body.user.name

      await newUser.save()
      res.send({ email, message: 'success', user: newUser })

      return
    }

    res.send({ email, message: 'success', user })
  } catch (error) {
    res.send(error)
  }
})

router.get('/user/programs/:email/:programId', async (req, res) => {
  const { email, programId } = req.params

  try {
    const user = await User.findOne({ email })

    if (!user) {
      res.send({
        message: 'you must sign up for an account to save your programs',
        success: true,
      })

      return
    }

    let foundProgram = null

    if (user.savedPrograms.length) {
      foundProgram = user.savedPrograms.find((id: string) => id === programId)
    }

    const foundProgramDate = user.savedProgramDates.find((program: any) => {
      program.id === programId
    })

    if (!foundProgramDate) {
      user.savedProgramDates.push({
        id: programId,
        dateAdded: new Date().toISOString(),
      })
    }

    if (!foundProgram) {
      user.savedPrograms.push(programId)
      // https://stackoverflow.com/questions/22278761/mongoose-difference-between-save-and-using-update
      await user.save()

      res.send({ message: 'Program Saved!', success: true })

      return
    }

    await user.save()

    res.send({
      message: 'This program is already saved!',
      success: true,
    })
  } catch (error) {
    res.send(error)
  }
})

// get all users programs
router.get('/user/:email/programs', async (req, res) => {
  try {
    const { email } = req.params
    const user = await User.findOne({ email })

    if (user.savedPrograms.length) {
      const records = await Program.find({ _id: { $in: user.savedPrograms } })

      res.send({ programs: records, success: true })

      return
    }

    res.send({ programs: null, success: true })
  } catch (error) {
    res.send({ error, success: false })
  }
})

// Delete user program
router.delete('/user/programs/:email/:programId', async (req, res) => {
  try {
    const { email, programId } = req.params
    const user = await User.findOne({ email })

    const updatedPrograms = user.savedPrograms.filter(
      (program: any) => program.toString() !== programId
    )

    user.savedPrograms = updatedPrograms
    await user.save()

    res.send({ message: 'Program successfully removed', success: true })
  } catch (error) {
    res.send({
      message: 'There was a problem removing the program',
      success: false,
    })
  }
})

// Tests
router.get('/users/email-list', async (_req, res) => {
  try {
    const users = await User.find({ interests: { $in: ['summer'] } }).lean()
    const userEmails = !isLocalEnv
      ? users.map((user: any) => user.email)
      : ['joeephus@gmail.com']

    res.send({
      message: 'success',
      data: userEmails,
      sendTo: users.map((user: any) => user.email),
    })
  } catch (error) {
    res.send({ error: true, message: error })
  }
})

const userRoutes = router

export { userRoutes }
