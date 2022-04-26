const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')

module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        const updatedJobs = jobs.map((job) => {
            //job adjustments
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            return {

                ...job,//Spread syntax
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["hour-value"])
            }
        })
        return res.render("index", { jobs: updatedJobs })
    },
}
