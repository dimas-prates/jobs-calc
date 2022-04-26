let data = [
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

module.exports = {
    get(){
        return data
    },
    update (newJob) {
        data = newJob;
    },
    delete(jobId){
        data = data.filter(job => Number(job.id) !== Number(jobId))
    }
}