require('dotenv').config()

const express = require('express')
const app = express()
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')
const programRoutes = require('./routes/programRoutes')
const statsRoutes = require('./routes/statsRoutes')

require('./mongoose/mongooseDB')

// https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 7000

app.get('/ping', (_req, res) => res.send('pinged'))

app.use(userRoutes)
app.use(programRoutes)
app.use(statsRoutes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
