const cors = require('cors')
const bodyParser = require('body-parser')
const express = require('express')
const Sse = require('json-sse')

const Room = require('./room/model')
const roomFactory = require('./room/router')

const app = express()

const jsonParser = bodyParser.json()
app.use(jsonParser)

const corsMiddleware = cors()
app.use(corsMiddleware)

const stream = new Sse()

// app.get(
//   '/stream',
//   (request, response) => {
//     Room
//       .findAll()
//       .then(rooms => {
//         const string = JSON
//           .stringify(rooms)
//
//         stream.updateInit(string)
//
//         stream.init(request, response)
//       })
//   }
// )

app.get(
  '/stream',
  async (request, response) => {
    const rooms = await Room.findAll()

    const action = {
      type: 'ROOMS',
      payload: rooms
    }

    const string = JSON
      .stringify(action)

    stream.updateInit(string)

    stream.init(request, response)
  }
)

const roomRouter = roomFactory(stream)
app.use(roomRouter)

const port = 4000

app.listen(
  port,
  () => {
    console.log(`Listening on ${port}`)
  }
)
