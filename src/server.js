const express = require('express');
const server = express()

//importing routes from routes.js
const routes = require("./routes")

//setting EJS the template engine
server.set('view engine', 'ejs')

//enabling static files
server.use(express.static("public"))

//enabling the express to receive/use the req.body
server.use(express.urlencoded({ extende: true }))

//routes 
server.use(routes)

server.listen(3000, () => { console.log("Server running...") })