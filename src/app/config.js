const fs = require('fs')
const path = require('path')

const dotenv = require('dotenv')

dotenv.config()


const privitePath = path.join(__dirname, './keys/private.key')
const publicPath = path.join(__dirname, './keys/private.key')

const PRIVATE_KEY = fs.readFileSync(privitePath)
const PUBLIC_KEY = fs.readFileSync(publicPath)

module.exports = {
  APP_HOST,
  APP_PORT,
  MONGODB_HOST,
  MONGODB_PORT,
  MONGODB_DATABASE
} = process.env

module.exports.PRIVATE_KEY = PRIVATE_KEY
module.exports.PUBLIC_KEY = PUBLIC_KEY