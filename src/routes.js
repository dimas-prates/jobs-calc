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
//commented cause refactoring + deleted all "views" reference in this document
//const views = __dirname + "/views/"

//importing profile controller which it was reallocated to another file (controllers/ProfileController.js)
const ProfileController = require('./controllers/ProfileController')

//importing job controler (reallocated from here to there)
const JobController = require('./controllers/JobController')

routes.get('/', JobController.index)
routes.get('/job', JobController.create)
routes.post('/job', JobController.save)
//routes.get('/job/edit', Job.controllers.show)
routes.get('/job/:jobId', JobController.show)
routes.post('/job/:jobId', JobController.update)
routes.post('/job/delete/:jobId', JobController.delete)
//routes.get('/profile', Profile.controllers.index)
//routes.post('/profile', Profile.controllers.update)
routes.get('/profile', ProfileController.index)
routes.post('/profile', ProfileController.update)

//Manually redirecting to a html page/file
//routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;