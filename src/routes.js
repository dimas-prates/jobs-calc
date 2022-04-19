const express = require('express')
const routes = express.Router()

//EJS already has implemented basepath to find the "views" section
//const basePath = __dirname + '/views'

//request, response
/*routes.get("/", (request, response) => {
    //return response.send('Hello WWWorld');
    //console.log(__dirname + "/views/index.html")
    return response.sendFile(__dirname + "/views/index.html")
})*/

//EJS doesn't "send" its renders
/*
routes.get('/', (req,res) => res.sendFile(basePath + "/index.html"))
routes.get('/job', (req,res) => res.sendFile(basePath + "/job.html"))
routes.get('/job/edit', (req,res) => res.sendFile(basePath + "/jog-edit.html"))
routes.get('/profile', (req,res) => res.sendFile(basePath + "/profile.html"))
*/

//EJS can read views when its locate in the root, need to adjust when is in "src"
const views = __dirname + "/views/"
routes.get('/', (req,res) => res.render(views +"index"))
routes.get('/job', (req,res) => res.render(views +"job"))
routes.get('/job/edit', (req,res) => res.render(views +"job-edit"))
routes.get('/profile', (req,res) => res.render(views +"profile"))

//Manually redirecting to a html page/file
//routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;
