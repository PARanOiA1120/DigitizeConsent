var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'mProv' });
});

router.get('/create-form-section', function(req, res, next){
	res.render('create-form-section', null);
});

module.exports = router;
