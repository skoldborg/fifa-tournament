const express = require('express');
const router = express.Router();
const teams = require('./teams');
const viewsDir = 'src/templates/views/';

router.get('/', teams.fetch);

router.get('/result', (req, res) => {
    const jadeTemplate = path.resolve(path.join(path.join(__dirname, '../'), viewsDir, 'result.jade'));

    res.render(jadeTemplate, { title: 'Register result' });
});

module.exports = router;
