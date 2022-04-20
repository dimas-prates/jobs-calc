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

//data to fill fields
const profile = {name: "Mayk",
avatar: "https://avatars.githubusercontent.com/u/6643122?v=4",
"monthly-budget": 3000,
"days-per-week": 5,
"hours-per-day": 5,
"vacation-per-year": 4}

routes.get('/', (req, res) => res.render(views + "index"))
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    console.log("save data")
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", {profile:profile}))

//Manually redirecting to a html page/file
//routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;
