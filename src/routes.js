const express = require('express')
const routes = express.Router()
const basePath = __dirname + '/views'

//request, response
/*routes.get("/", (request, response) => {
    //return response.send('Hello WWWorld');
    //console.log(__dirname + "/views/index.html")
    return response.sendFile(__dirname + "/views/index.html")
})*/

routes.get('/', (req,res) => res.sendFile(basePath + "/index.html"))
routes.get('/job', (req,res) => res.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (req,res) => res.sendFile(basePath + "/jog-edit.html"))
routes.get('/profile', (req,res) => res.sendFile(basePath + "/profile.html"))

//Manually redirecting to a html page/file
//routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;
