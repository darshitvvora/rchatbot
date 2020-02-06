/**
 * Created by Yatish on 01-02-2020.
*/

const NodeMinio = require('node-minio');

const { MINIO } = require('../../config/environment');

const Minio = new NodeMinio(MINIO);

module.exports = Minio;
