var express = require('express');
var router = express.Router();
var path = require('path');

/* GET notes page. */
router.get('/', function(req, res, next) {
    res.sendFile(path.join(__dirname, "../public/notes.html"));
});

module.exports = router;