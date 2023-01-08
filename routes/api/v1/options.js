const express = require('express');
const router = express.Router();

const OptionsController = require('../../../controller/api/v1/options_controller');

router.delete('/:id/delete',OptionsController.DeleteOption);

module.exports = router;