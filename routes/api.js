/**ROUTE USER APIs. */
var express = require('express')

var router = express.Router()
var users = require('./api/user.route')
var hijos = require('./api/hijo.route')

router.use('/users', users);
router.use('/hijos', hijos);

module.exports = router;
