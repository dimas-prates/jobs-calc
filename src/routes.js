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
const Profile = {
    data: {
        name: "Mayk",
        avatar: "https://github.com/maykbrito.png",
        "monthly-budget": 3000,
        "days-per-week": 5,
        "hours-per-day": 5,
        "vacation-per-year": 4,
        "hour-value": 75
    },
    controllers: {
        index(req, res) {
            return res.render(views + "profile", { profile: Profile.data })
        },
        update(req,res){
            //req.body to have data
            //define weeks per year
            //remove vacation weeks per year 
            //how much hours per week working
            //total work hours monthly
            
        }
    }
}

const Job = {
    data: [
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
    ],

    controllers: {
        index(req, res) {

            const updatedJobs = Job.data.map((job) => {
                //job adjustments
                const remaining = Job.services.remainingDays(job)
                const status = remaining <= 0 ? 'done' : 'progress'

                return {

                    ...job,//Spread syntax
                    remaining,
                    status,
                    budget: Profile.data["hour-value"] * job["total-hours"]
                }
            })
            return res.render(views + "index", { jobs: updatedJobs })
        },
        create(req, res) {
            return res.render(views + "job")
        },
        save(req, res) {
            //console.log("save data")
            //console.log(req.body)

            //get last ID if exists or consider number 1
            const lastId = Job.data[Job.data.length - 1]?.id || 1
            Job.data.push({
                id: lastId + 1,
                name: req.body.name,
                'daily-hours': req.body["daily-hours"],
                'total-hours': req.body["total-hours"],
                createdAt: Date.now() // adding new date
            })
            return res.redirect('/')
        }
    },

    services: {
        remainingDays(job) {
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
    }
}

routes.get('/', Job.controllers.index)
routes.get('/job', Job.controllers.create)
routes.post('/job', Job.controllers.save)
routes.get('/job/edit', (req, res) => res.render(views + "job-edit"))
routes.get('/profile', Profile.controllers.index)
routes.post('/profile', Profile.controllers.update)

//Manually redirecting to a html page/file
//routes.get('/index.html', (req,res) => {return res.redirect('/') })

module.exports = routes;
