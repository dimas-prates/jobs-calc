const { update } = require("../controllers/ProfileController");

//data to fill fields
let data = {
    name: "Mayk",
    avatar: "https://github.com/maykbrito.png",
    "monthly-budget": 3000,
    "days-per-week": 5,
    "hours-per-day": 5,
    "vacation-per-year": 4,
    "hour-value": 75
}

module.exports = {
    get() {
        return data;
    },
    update(newData) {
        data = newData;
    }
}