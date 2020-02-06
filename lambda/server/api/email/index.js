const express = require('express');
const controller = require('./email.controller');

const router = express.Router();

router.post('/sendMail', controller.sendMail);

module.exports = router;
