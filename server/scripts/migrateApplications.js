import 'dotenv/config'
import { MongoClient } from 'mongodb'

function createDirectMongoUri() {
  const srvUri = new URL(process.env.MONGODB_URI)

  const username = encodeURIComponent(
    decodeURIComponent(srvUri.username),
  )

  const password = encodeURIComponent(
    decodeURIComponent(srvUri.password),
  )

  const hosts = [
    'ac-29zo9zt-shard-00-00.f5w37kp.mongodb.net:27017',
    'ac-29zo9zt-shard-00-01.f5w37kp.mongodb.net:27017',
    'ac-29zo9zt-shard-00-02.f5w37kp.mongodb.net:27017',
  ].join(',')

  const database = srvUri.pathname || '/'

  return (
    `mongodb://${username}:${password}@${hosts}${database}` +
    '?tls=true' +
    '&replicaSet=atlas-kxmnw9-shard-0' +
    '&authSource=admin'
  )
}

async function migrateApplications() {
  const client = new MongoClient(createDirectMongoUri())

  try {
    await client.connect()

    const dbName = new URL(process.env.MONGODB_URI)
      .pathname.slice(1)

    const db = client.db(dbName)

    const user = await db.collection('users').findOne({
      email: 'jobtrack-test@example.com',
    })

    if (!user) {
      console.log('User not found')
      return
    }

    const result = await db
      .collection('applications')
      .updateMany(
        {
          userId: { $exists: false },
        },
        {
          $set: {
            userId: user._id,
          },
        },
      )

    console.log(
      `Applications updated: ${result.modifiedCount}`,
    )
  } catch (error) {
    console.log('Migration failed')
    console.log(error.message)
  } finally {
    await client.close()
  }
}

migrateApplications()