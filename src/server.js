const express = require('express');
const server = express()

//importing routes from routes.js
const routes = require("./routes")

//importing module path
const path = require('path')

//setting EJS the template engine
server.set('view engine', 'ejs')

//changing views path location
server.set('views', path.join(__dirname, 'views'))

//enabling static files
server.use(express.static("public"))

//enabling the express to receive/use the req.body
server.use(express.urlencoded({ extende: true }))

//routes 
server.use(routes)

server.listen(3000, () => { console.log("Server running...") })