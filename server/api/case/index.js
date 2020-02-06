const express = require('express');
const controller = require('./case.controller');

const router = express.Router();

router.get('/bucket', controller.getCaseBuckets);
router.get('/comment', controller.getComments);
module.exports = router;
