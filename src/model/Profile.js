//const { update } = require("../controllers/ProfileController");
const Database = require('../db/config')

//data to fill fields
// let data = {
//     name: "Mayk",
//     avatar: "https://github.com/maykbrito.png",
//     "monthly-budget": 3000,
//     "days-per-week": 5,
//     "hours-per-day": 5,
//     "vacation-per-year": 4,
//     "hour-value": 75
// }

module.exports = {
    async get() {
        const db = await Database()
        
        //const  data2 = await db.run(`SELECt * FROM profile`)
        const  data = await db.get(`SELECt * FROM profile`)
        
        await db.close()
        //console.log(data2)
        //return data2;

        return {
            name: data.name,
            avatar: data.avatar,
            "monthly-budget": data.monthly_budget,
            "days-per-week": data.days_per_week,
            "hours-per-day": data.hours_per_day,
            "vacation-per-year": data.vacation_per_year,
            "hour-value": data.hour_value 
        }
    },
    async update(newData) {
        const db = await Database();

        db.run(`UPDATE profile SET 
        name = "${newData.name}",
        avatar = "${newData.avatar}",
        monthly_budget = ${newData["monthly-budget"]},
        days_per_week = ${newData["days-per-week"]},
        hours_per_day = ${newData["hours-per-day"]},
        vacation_per_year= ${newData["vacation-per-year"]},
        hour_value= ${newData["hour-value"]}
        `)
        await db.close()
    }
}