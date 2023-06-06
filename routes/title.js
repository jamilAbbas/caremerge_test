const express = require('express');
const { getTitleTags, getTitleTagsUsingAsyncFlowLib, getTitlesUsingPromises } = require('../controllers/title');
const router = express.Router();

// using plain nodejs
router.route('/title').get(getTitleTags);

// using async flow lib
// router.route('/title').get(getTitleTagsUsingAsyncFlowLib);

//using Primises
// router.route('/title').get(getTitlesUsingPromises);

module.exports = router;