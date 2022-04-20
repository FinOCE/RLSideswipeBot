import Client from '@client/Client'
import dotenv from 'dotenv'
import process from 'process'

dotenv.config()
process.stdin.resume()

const client = new Client()
client.login(process.env.CLIENT_ID!, process.env.CLIENT_SECRET!)
