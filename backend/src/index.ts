import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import { userRoutes } from './routes/userRoutes'
import { programRoutes } from './routes/programRoutes'
import mongoose from 'mongoose'

const app = express()
// import statsRoutes from './routes/statsRoutes'

const server = `mongodb://joeeloee:${process.env.DB_PASSWORD}@cluster0-shard-00-00.nnv78.mongodb.net:27017,cluster0-shard-00-01.nnv78.mongodb.net:27017,cluster0-shard-00-02.nnv78.mongodb.net:27017/lead-latinoamerica?ssl=true&replicaSet=atlas-vtvxq2-shard-0&authSource=admin&retryWrites=true&w=majority`
// const database = 'lead-latinoamerica';

mongoose.connect(server, {
  ssl: true,
})

// https://stackoverflow.com/questions/66525078/bodyparser-is-deprecated
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

const port = process.env.PORT || 7000

// @ts-ignore
app.get('/ping', (_req, res) => res.send('pinged'))

app.use(userRoutes)
app.use(programRoutes)
// app.use(statsRoutes)

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})
