import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import mongoose from 'mongoose'
import applicationRoutes from './routes/applicationRoutes.js'

const app = express()
const PORT = 5000

app.use(cors())
app.use(express.json())

app.use('/api/applications', applicationRoutes)

app.get('/', (req, res) => {
  res.json({
    message: 'JobTrack backend is running',
  })
})

function createDirectMongoUri() {
  const srvUri = new URL(process.env.MONGODB_URI)

  const hosts = [
    'ac-29zo9zt-shard-00-00.f5w37kp.mongodb.net:27017',
    'ac-29zo9zt-shard-00-01.f5w37kp.mongodb.net:27017',
    'ac-29zo9zt-shard-00-02.f5w37kp.mongodb.net:27017',
  ].join(',')

  const database = srvUri.pathname || '/'

  return `mongodb://${srvUri.username}:${srvUri.password}@${hosts}${database}?tls=true&replicaSet=atlas-kxmnw9-shard-0&authSource=admin`
}

async function connectDatabase() {
  try {
    const mongoUri = createDirectMongoUri()

    await mongoose.connect(mongoUri, {
      serverSelectionTimeoutMS: 10000,
      family: 4,
    })

    console.log('MongoDB connected successfully')

    app.listen(PORT, () => {
      console.log(
        `JobTrack server running on http://localhost:${PORT}`,
      )
    })
  } catch (error) {
    console.log('MongoDB connection failed')
    console.log(error.message)
  }
}

connectDatabase()
