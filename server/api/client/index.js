const express = require('express');
const controller = require('./client.controller');

const router = express.Router();

router.get('/partner', controller.getVendorPartners);
router.get('/clientMeta', controller.getMetaInfo);

module.exports = router;
