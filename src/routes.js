const express = require('express')
const routes = express.Router()


//request, response
routes.get("/", (request, response) => {
    //return response.send('Hello WWWorld');
    //console.log(__dirname + "/views/index.html")
    return response.sendFile(__dirname + "/views/index.html")
})

//Manually redirecting to a html page/file
routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;
