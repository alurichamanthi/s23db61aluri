var express = require('express');
const animals_controlers= require('../controllers/animals');
var router = express.Router();
/* GET costumes */
router.get('/', animals_controlers.animals_view_all_Page );
/* GET detail costume page */
router.get('/detail', animals_controlers.animals_view_one_Page);
/* GET create costume page */
router.get('/create', animals_controlers.animals_create_Page);
/* GET create update page */
router.get('/update', animals_controlers.animals_update_Page);
/* GET delete costume page */
router.get('/delete', animals_controlers.animals_delete_Page);
module.exports = router;
