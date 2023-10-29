var express = require('express');
var router = express.Router();

router.get('/cars', function (req, res, next) {
  res.render('cars', { title: 'Search Results - Cars' });
});

module.exports = router;
