const express = require('express');
const router = express.Router();
const usersControllerAPI = require('../../controllers/api/usersController');

// List
router.get('/', usersControllerAPI.list);

// Detail
router.get('/:id', usersControllerAPI.detail);

module.exports = router;
