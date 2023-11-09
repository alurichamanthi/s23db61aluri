const mongoose = require("mongoose")
const animalsSchema = mongoose.Schema({
name: String,
lifespan: String,
cost: Number
})
module.exports = mongoose.model("animals",
animalsSchema)