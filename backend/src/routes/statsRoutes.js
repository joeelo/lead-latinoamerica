const express = require('express')
const Program = require('../models/Program')
const router = express.Router()
const dayjs = require('dayjs')
const User = require('../models/User')

router.get('/stats/programs', async (_, res) => {
  try {

    const stats = {}

    const sixMonthInPast = dayjs().subtract(6, 'month').toDate() 
    
    const programs = await Program
    .find({
      approved: true, 
      createdAt: { $gt: sixMonthInPast }
    })
    .lean()

    programs.forEach((program) => {
      const programCreatedMonth = dayjs(program.createdAt).format('MMMM')

      if (!Number(stats[programCreatedMonth])) {
        stats[programCreatedMonth] = 0
      }

      stats[programCreatedMonth] += 1
    })

    res.send({ success: true, message: { stats } })
  } catch (error) { 
    res.send({ success: false, message: error, error: true, })
  }
})

router.get('/stats/programs/:email', async (req, res) => {
  const { email } = req.params

  try {
    const user = await User.findOne({ email }).lean()

    const stats = {}

    const sixMonthInPast = dayjs().subtract(6, 'month').toDate() 
    
    const programs = await Program
    .find({
      approved: true, 
      createdAt: { $gt: sixMonthInPast }
    })
    .lean()

    // create a list of months in '03-01-2023' format starting from 6 months ago
    for (let i = 0; i < 6; i++) {
      const month = dayjs()
      .subtract(i, 'month')
      .startOf('month')
      .toISOString()
      .split('T')[0]

      stats[month] = { program: 0, user: 0 }
    }

    programs.forEach((program) => {
      const month = dayjs(program.createdAt).startOf('month').toISOString().split('T')[0]

      if (stats[month] && stats[month].program > -1) {
        stats[month].program += 1
      }
    })

    user.savedProgramDates.forEach((program) => {
      const month = dayjs(program.dateAdded).startOf('month').toISOString().split('T')[0]

      if (stats[month] && stats[month].user > -1) {
        stats[month].user += 1
      }
    })

    res.send({ success: true, message: { stats } })
  } catch (error) { 
    console.log('ERROR', error)
    res.send({ success: false, message: error, error: true, })
  }
})

module.exports = router