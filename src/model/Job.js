//const { Database } = require("sqlite");
const Database = require('../db/config')
// let data = [
//     {
//         id: 1,
//         name: "Pizzaria Guloso",
//         'daily-hours': 2,
//         'total-hours': 1,
//         createdAt: Date.now(), // adding new date
//     },
//     {
//         id: 2,
//         name: "OneTwo Project",
//         'daily-hours': 3,
//         'total-hours': 47,
//         createdAt: Date.now(), // adding new date
//     }
// ]

module.exports = {
    async get() {
        const db = await Database();
        //similar to get, instead get all rows 
        //const data = await db.all(`SELECT * FROM jobs`)
        const jobs = await db.all(`SELECT * FROM jobs`)
        //console.log(data)
        await db.close()

        return jobs.map(job => ({
            //return {
            id: job.id,
            name: job.name,
            "daily-hours": job.daily_hours,
            "total-hours": job.total_hours,
            createdAt: job.createdAt
            //}
        }));
    },
    async update(updatedJob, jobId) {
        // data = newJob;
        const db = await Database()
        await db.run(`UPDATE jobs SET
        name = "${updatedJob.name}",
        daily_hours = ${updatedJob["daily-hours"]},
        total_hours = ${updatedJob["total-hours"]}
        WHERE id = ${jobId}
        `)
        await db.close()
    },
    async delete(jobId) {
        // data = data.filter(job => Number(job.id) !== Number(jobId))
        const db = await Database();
         
        await db.run(`DELETE FROM jobs WHERE id = ${jobId}`)

        await db.close()
    },
    async create(newJob) {
        //data.push(newJob)
        const db = await Database()
        await db.run(`INSERT INTO Jobs (
            name,
            daily_hours,
            total_hours,
            createdAt
        ) VALUES (
            "${newJob.name}",
            ${newJob["daily-hours"]},
            ${newJob["total-hours"]},
            ${newJob["createdAt"]}
        )`)
        await db.close()
    }
}