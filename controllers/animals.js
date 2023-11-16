var animals = require('../models/animals');
// List of all Costumes
exports.animals_list = async function(req, res) {
    try{
    theanimals = await animals.find();
    res.send(theanimals);
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    // VIEWS
// Handle a show all view
exports.animals_view_all_Page = async function(req, res) {
    try{
    theanimals = await animals.find();
    res.render('animals', { title: 'Animals Search Results', results: theanimals });
    }
    catch(err){
    res.status(500);
    res.send(`{"error": ${err}}`);
    }
    };
    // Handle Costume create on POST.
exports.animals_create_post = async function(req, res) {
console.log(req.body)
let document = new animals();
// We are looking for a body, since POST does not have query parameters.
// Even though bodies can be in many different formats, we will be picky
// and require that it be a json object
// {"costume_type":"goat", "cost":12, "size":"large"}
document.name = req.body.name;
document.lifespan= req.body.lifespan;
document.cost = req.body.cost;
try{
let result = await document.save();
res.send(result);
}
catch(err){
res.status(500);
res.send(`{"error": ${err}}`);
}
};

    
// List of all Costumes
/*exports.animals_list = function(req, res) {
res.send('NOT IMPLEMENTED: animals list');
};*/
// for a specific Costume.
exports.animals_detail = async function(req, res) {
    console.log("detail" + req.params.id)
    try {
    result = await animals.findById( req.params.id)
    res.send(result)
    } catch (error) {
    res.status(500)
    res.send(`{"error": document for id ${req.params.id} not found`);
    }
    };
    
// Handle Costume create on POST.
/*exports.animals_create_post = function(req, res) {
res.send('NOT IMPLEMENTED: animals create POST');
};*/
// Handle Costume delete form on DELETE.
exports.animals_delete = function(req, res) {
res.send('NOT IMPLEMENTED: animals delete DELETE ' + req.params.id);
};
// Handle Costume update form on PUT.
exports.animals_update_put = async function(req, res) {
    console.log(`update on id ${req.params.id} with body
    ${JSON.stringify(req.body)}`)
    try {
    let toUpdate = await animals.findById( req.params.id)
    // Do updates of properties
    if(req.body.name)
    toUpdate.name = req.body.name;
    if(req.body.lifespan) toUpdate.lifespan = req.body.lifespan;
    if(req.body.cost) toUpdate.cost = req.body.cost;
    let result = await toUpdate.save();
    console.log("Sucess " + result)
    res.send(result)
    } catch (err) {
    res.status(500)
    res.send(`{"error": ${err}: Update for id ${req.params.id}
    failed`);
    }
    };
    // Handle Costume delete on DELETE.
exports.animals_delete = async function(req, res) {
 console.log("delete " + req.params.id)
 try {
 result = await animals.findByIdAndDelete( req.params.id)
 console.log("Removed " + result)
 res.send(result)
 } catch (err) {
 res.status(500)
 res.send(`{"error": Error deleting ${err}}`);
 }
};
// Handle a show one view with id specified by query
exports.animals_view_one_Page = async function(req, res) {
    console.log("single view for id " + req.query.id)
    try{
    result = await animals.findById( req.query.id)
    res.render('animalsdetail',
   { title: 'animals Detail', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };   
   // Handle building the view for creating a costume.
// No body, no in path parameter, no query.
// Does not need to be async
exports.animals_create_Page = function(req, res) {
    console.log("create view")
    try{
    res.render('animalscreate', { title: 'animals Create'});
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };
   // Handle building the view for updating a costume.
// query provides the id
exports.animals_update_Page = async function(req, res) {
    console.log("update view for item "+req.query.id)
    try{
    let result = await animals.findById(req.query.id)
    res.render('animalsupdate', { title: 'animals Update', toShow: result });
    }
    catch(err){
    res.status(500)
    res.send(`{'error': '${err}'}`);
    }
   };

// Handle a delete one view with id from query
exports.animals_delete_Page = async function(req, res) {
 console.log("Delete view for id " + req.query.id)
 try{
 result = await animals.findById(req.query.id)
 res.render('animalsdelete', { title: 'animals Delete', toShow:
result });
 }
 catch(err){
 res.status(500)
 res.send(`{'error': '${err}'}`);
 }
};

