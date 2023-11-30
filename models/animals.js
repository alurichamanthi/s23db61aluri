const mongoose = require("mongoose")
const animalsSchema = mongoose.Schema({
name: String,
lifespan: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50
},
cost: {
    type:Number,
    required:true,
    min:10,
    max:5000
}
})
module.exports = mongoose.model("animals",
animalsSchema)