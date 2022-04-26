const Job = require('../model/Job')
const JobUtils = require('../utils/JobUtils')
const Profile = require('../model/Profile')


module.exports = {
    index(req, res) {
        const jobs = Job.get();
        const profile = Profile.get();

        let statusCount = {
            progress: 0,
            done: 0,
            total: jobs.length,
        }

        //Total hours per day for each job in progress
        let jobTotalHours = 0;

        const updatedJobs = jobs.map((job) => {
            //job adjustments
            const remaining = JobUtils.remainingDays(job)
            const status = remaining <= 0 ? 'done' : 'progress'

            //when variable status receive "done" or "progress" it will add +1 one of itens into statusCount
            //statusCount[done] += 1
            //statusCount[progress] += 1
            statusCount[status] += 1

            jobTotalHours = status == 'progress' ? jobTotalHours + Number(job['daily-hours']) : jobTotalHours

            return {
                ...job,//Spread syntax
                remaining,
                status,
                budget: JobUtils.calculateBudget(job, profile["hour-value"])
            }
        })
        //hours per day minus hours per jobs
        const freeHours = profile['hours-per-day'] - jobTotalHours;


        return res.render("index", { jobs: updatedJobs, profile: profile, statusCount: statusCount, freeHours: freeHours })
    },
}
