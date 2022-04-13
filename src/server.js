const express = require('express');
const server = express()

//enabling static files
server.use(express.static("public"))

//request, response
server.get("/", (request, response) => {
    //return response.send('Hello WWWorld');
    //console.log(__dirname + "/views/index.html")
    return response.sendFile(__dirname + "/views/index.html")
})

server.listen(3000, () => {
    console.log("Server running...")
})