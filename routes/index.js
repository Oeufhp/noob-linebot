var express = require('express')
var router = express.Router()
const bodyParser = require('body-parser')
const middleware = require('@line/bot-sdk').middleware

const config = {
  channelAccessToken: 'YOUR_CHANNEL_ACCESSTOKEN',
  channelSecret: 'YOUR_CHANNEL_SECRET'
}

router.post('/webhook', middleware(config), function(req, res, next) {
  res.status(200).send('success')
})
module.exports = router
