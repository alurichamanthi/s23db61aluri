var express = require('express');
const animals_controlers= require('../controllers/animals');
var router = express.Router();
/* GET costumes */
router.get('/', animals_controlers.animals_view_all_Page );
module.exports = router;
