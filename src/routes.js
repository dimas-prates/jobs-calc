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
const profile = {
    name: "Mayk",
    avatar: "https://github.com/maykbrito.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "hour-value": 75
}

//jobs controller
const jobs = [
    {
        id: 1,
        name: "Pizzaria Guloso",
        'daily-hours': 2,
        'total-hours': 1,
        createdAt: Date.now(), // adding new date
    },
    {
        id: 2,
        name: "OneTwo Project",
        'daily-hours': 3,
        'total-hours': 47,
        createdAt: Date.now(), // adding new date
    }
]

function remainingDays(job) {
    //calc time remaining
    const daysLeft = (job["total-hours"] / job["daily-hours"]).toFixed()

    const createdDate = new Date(job.createdAt)
    const dueDay = createdDate.getDate() + Number(daysLeft)
    const dueDateInMs = createdDate.setDate(dueDay)

    const timeDiffInMs = dueDateInMs - Date.now()

    //converting ms to days
    const dayInMs = 1000 * 60 ** 2 * 24

    //remaining days
    const dayDiff = Math.floor(timeDiffInMs / dayInMs)

    return dayDiff

}
routes.get('/', (req, res) => {
    const updatedJobs = jobs.map((job) => {
        //job adjustments
        const remaining = remainingDays(job)
        const status = remaining <= 0 ? 'done' : 'progress'
        return {
            
            ...job,//Spread syntax
            remaining,
            status,
            budget: profile["hour-value"] * job["total-hours"]
        }
    })



    return res.render(views + "index", { jobs : updatedJobs})
})
routes.get('/job', (req, res) => res.render(views + "job"))
routes.post('/job', (req, res) => {
    //console.log("save data")
    //console.log(req.body)

    //get last ID if exists or consider number 1
    const lastId = jobs[jobs.length - 1]?.id || 1
    jobs.push({
        id: lastId + 1,
        name: req.body.name,
        'daily-hours': req.body["daily-hours"],
        'total-hours': req.body["total-hours"],
        createdAt: Date.now() // adding new date
    }
    )
    return res.redirect('/')
})
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', (req, res) => res.render(views + "profile", { profile: profile }))

//Manually redirecting to a html page/file
//routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;
