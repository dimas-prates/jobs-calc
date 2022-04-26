module.exports = {
    index(req, res) {

        const updatedJobs = Job.data.map((job) => {
            //job adjustments
            const remaining = Job.services.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            return {

                ...job,//Spread syntax
                remaining,
                status,
                budget: Job.services.calculateBudget(job, Profile.data["hour-value"])
            }
        })
        return res.render("index", { jobs: updatedJobs })
    },
    create(req, res) {
        return res.render("job")
    },
    save(req, res) {
        //console.log("save data")
        //console.log(req.body)
        //get last ID if exists or consider number 1
        //optional chaining operator "?."
        const lastId = Job.data[Job.data.length - 1]?.id || 1
        Job.data.push({
            id: lastId + 1,
            name: req.body.name,
            'daily-hours': req.body["daily-hours"],
            'total-hours': req.body["total-hours"],
            createdAt: Date.now() // adding new date
        })
        return res.redirect('/')
    },
    show(req, res) {
        const jobId = req.params.jobId
        const job = Job.data.find(job => Number(job.id) === Number(jobId))
        if (!job) {
            return res.send('Job not found')
        }

        job.budget = Job.services.calculateBudget(job, Profile.data["hour-value"])

        return res.render("job-edit", { job })
    },
    update(req, res) {
        const jobId = req.params.jobId
        const job = Job.data.find(job => Number(job.id) === Number(jobId))
        if (!job) {
            return res.send('Job not found')
        }

        const updatedJob = {
            ...job,
            name: req.body.name,
            "total-hours": req.body["total-hours"],
            "daily-hours": req.body["daily-hours"],
        }
        Job.data = Job.data.map(job => {
            if (Number(job.id) === Number(jobId)) {
                job = updatedJob
            }
            return job
        })
        res.redirect('/job/' + jobId)
    },
    delete(req, res) {
        const jobId = req.params.jobId

        Job.data = Job.data.filter(job => Number(job.id) !== Number(jobId))
        return res.redirect('/')
    }
}
