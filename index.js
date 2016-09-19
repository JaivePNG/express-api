var bodyParser = require('body-parser')
var express = require('express')
var path = require('path')

var index = require('./routes/index')

var PORT = 3000
var app = express()

app.use(bodyParser.json())

app.get('/', index.get)
//
app.get('/:id', index.getUser)
app.delete('/:id', index.delUser)

app.listen(PORT, function () {
  console.log('Listening on port', PORT)
})
