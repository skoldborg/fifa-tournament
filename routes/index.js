const helpers = require('./helpers');
const express = require('express')
const router = express.Router();

// VIEWS
router.get('/*', (req, res, next) => {
    res.locals.currentHost = helpers.getCurrentHost(req);
    next();
});

router.get('/', helpers.renderJade.bind(this, 'index') );

module.exports = router;
