// Import Dependencies
require("dotenv").config()
const {PORT, NODE_ENV} = process.env
const express = require("express");
const mongoose = require("./db/connection")
const morgan = require("morgan")
const cors = require("cors")
const corsOptions = require("./config/cors")
const AuthRouter = require("./controllers/user")
const auth = require("./auth/index")


// Application Object
const app = express()

// Middleware
app.use(NODE_ENV === "production" ? cors(corsOptions) : cors()) 
app.use(morgan("tiny"))
app.use(express.json())
app.use(express.static("public"))

// Routers
app.use("/auth", AuthRouter)
app.get("/", auth, (request, response) => {
    response.json(request.payload)
} )
// Routes
app.get("/", (request, response) => {
    response.send("Hello World")
})

// Listener

app.listen(PORT, () => {
    console.log(`Listening on port: ${PORT}`)
})