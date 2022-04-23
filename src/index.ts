import Client from '@client/Client'
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()
process.stdin.resume()

const client = new Client()
client.login(
  process.env.REDDIT_USERNAME!,
  process.env.REDDIT_PASSWORD!,
  process.env.CLIENT_ID!,
  process.env.CLIENT_SECRET!
)
