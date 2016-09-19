var express = require('express')
var development = require('../knexfile').development
var knex = require('knex')(development)
var router = express.Router()

module.exports = {
  get: get,
  getUser: getUser,
  delUser: delUser,
  putUser:putUser,
  addUser: addUser
}

function get (req, res) {
  knex('users')
    .select()
    .then(function (users) {
      res.json(users)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })
}

function getUser(req, res) {
  knex('users')
  .select()
  .where( "id", "=", req.params.id)
  .then(function (users) {
    res.json(users[0])
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}

function delUser (req, res) {
  knex('users')
  .del()
  .where( "id", "=", req.params.id )
  .then(function (delcount) {
    if (delcount == 1) {
      res.send(204)
    } else {
      res.send(404)
    }
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}

function putUser (req, res) {
  knex('users')
  .where( "id", "=", req.params.id )
  .update({
    name: req.body.name,
    email: req.body.email
    })
  .then(function (updateCount) {
    res.send(204)
  })
  .catch(function (err) {
    res.status(500).send('DATABASE ERROR: ' + err.message)
  })
}

function addUser (req, res) {
  knex ('users')
  // .where("id", "=", req.prams.id)
  .insert({
    name: req.body.name,
    email: req.body.email
    })
    .then(function (newID) {
      res.send("http://localhost:3000/" + newID)
    })
    .catch(function (err) {
      res.status(500).send('DATABASE ERROR: ' + err.message)
    })

}
