const express = require('express'),
    router = express.Router(),
    chirpsRouter = require('./chirps');

router.use('/chirps', chirpsRouter);

module.exports = router;
