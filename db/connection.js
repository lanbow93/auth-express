require("dotenv").config()
const {MONGODB_URI} = process.env
const mongoose = require("mongoose")
const config = {useNewUrlParser: true, useUnifiedTopology: true}

mongoose.set('strictQuery', true);

mongoose.connect(MONGODB_URI, config)

mongoose.connection
    .on("open", () => console.log("Connected to Mongo"))
    .on("close", () => console.log("Disconnected from Mongo"))
    .on("error", (error) => console.log(error))

module.exports = mongoose 
