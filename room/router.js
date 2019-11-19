const express = require('express')
const Room = require('./model')

const { Router } = express

function factory (stream) {
  const router = new Router()

  router.post(
    '/room',
    async (request, response) => {
      const room = await Room
        .create(request.body)

      const action = {
        type: 'ROOM',
        payload: room
      }

      const string = JSON
        .stringify(action)

      stream.send(string)

      // Just for testing
      response.send(room)
    }
  )

  return router
}

module.exports = factory
