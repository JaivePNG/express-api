var express = require('express')
var development = require('../knexfile').development
var knex = require('knex')(development)
var router = express.Router()

module.exports = {
  get: get,
  getUser: getUser,
  delUser: delUser
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



// var knex = require("knex")(knexConfig);
// knex("test")
// .where("col1","a4")
// .del()
// .then(function (count) {
//   console.log(count);
// }).finally(function () {
//   knex.destroy();
// });
