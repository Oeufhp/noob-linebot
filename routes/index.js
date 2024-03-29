var express = require('express')
var router = express.Router()
const middleware = require('@line/bot-sdk').middleware
const request = require('request')

const config = {
  channelAccessToken: 'CHANNEL_ACCESS_TOKEN',
  channelSecret: 'CHANNEL_SECRET'
}

function handleEvent(event) {
  if (event.type !== 'message' || event.message.type !== 'text') {
    return Promise.resolve('ok');
  }
  else {
    let triggerMessage = event.message.text.toUpperCase()

    let replyMsg

    const userId = event.source.userId
    if (triggerMessage !== 'WEATHER') {
      replyMsg = {
        "to": userId,
        "messages": [
          {
            "type": "text",
            "text": "What do you want to know",
            "quickReply": {
              "items": [
                {
                  "type": "action",
                  "action": {
                    "type": "message",
                    "label": "weather",
                    "text": "weather"
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "cameraRoll",
                    "label": "Camera Roll"
                  }
                },
                {
                  "type": "action",
                  "action": {
                    "type": "camera",
                    "label": "Camera"
                  }
                }
              ]
            }
          }
        ]
      }

    } else {
      replyMsg = {
        "to": userId,
        "type": "text",
        "text": "What city?",
        "messages": [
          {
            type: "text",
            "text": "What city?"
          }
        ]
      }

    }
    const options = {
      url: 'https://api.line.me/v2/bot/message/push',
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${config.channelAccessToken}`
      },
      body: JSON.stringify(replyMsg)
    }
  
    request.post(options , function(err, res, body) {
      console.log(err)
      console.log(body)
    })

  }
}

const webhook = (req, res) => {
  console.log(`User Id: ${req.body.events[0].source.userId}`)
   Promise
    .all(req.body.events.map(handleEvent))
    .catch(e => console.log(e))
  
  return res.json({status: 'ok'})
}

router.post('/webhook', middleware(config), webhook)

module.exports = router
