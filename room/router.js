const express = require('express')
const Room = require('./model')
const User = require('../user/model')

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

  router.put(
    '/join/:name',
    async (request, response, next) => {
      const userId = 1

      const user = await User
        .findByPk(userId)

      console.log('user test:', user)

      // If you use the auth middleware, you only need this
      // const { user } = request
      //

      if (!user) {
        return next('No user found')
      }

      const { name } = request.params

      const room = await Room.findOne(
        { where: { name } }
      )

      const updated = await user
        .update({ roomId: room.id })

      response.send(updated)
    }
  )

  return router
}

module.exports = factory
