var express = require('express');
const animals_controlers= require('../controllers/animals');
var router = express.Router();
const secured = (req, res, next) => {
    if (req.user){
    return next();
    }
    res.redirect("/login");
    }
/* GET costumes */
router.get('/', animals_controlers.animals_view_all_Page );
/* GET detail costume page */
router.get('/detail',secured, animals_controlers.animals_view_one_Page);
/* GET create costume page */
router.get('/create',secured, animals_controlers.animals_create_Page);
/* GET create update page */
router.get('/update',secured, animals_controlers.animals_update_Page);
/* GET delete costume page */
router.get('/delete',secured, animals_controlers.animals_delete_Page);
module.exports = router;
