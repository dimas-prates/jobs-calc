const express = require('express');
const server = express()

//importing routes from routes.js
const routes = require("./routes")

//setting EJS
server.set('view engine', 'ejs')

//enabling static files
server.use(express.static("public"))

//routes 
server.use(routes)

server.listen(3000, () => {console.log("Server running...")})