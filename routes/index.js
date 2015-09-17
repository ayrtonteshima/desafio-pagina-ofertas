var express = require('express');
var router = express.Router();

var fs = require('fs')
var _ = require("underscore");



/* GET home page. */

router.get('/', function(req, res) {

  var offer = JSON.parse(fs.readFileSync('./public/offers.json').toString());
  offer = _.findWhere(offer, {id: 0});
  res.render('index', offer);

});

router.get('/offers/:id', function (req, res) {
  
  var offer = JSON.parse(fs.readFileSync('./public/offers.json').toString());

  res.json(_.findWhere(offer, {id: parseInt(req.params.id, 10) }).options);

});

module.exports = router;
