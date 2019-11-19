const express = require('express')
const Sse = require('json-sse')

const app = express()

const stream = new Sse()

app.get('/stream', (request, response) => {
  stream.init(request, response)
})

const port = 4000

app.listen(port, () => console.log(`Listening on ${port}`))
