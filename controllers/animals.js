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
    
    

