module.exports = {
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
    },
    calculateBudget: (job, valueHour) => valueHour * job["total-hours"]
}