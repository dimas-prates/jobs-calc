//importing profile data
const Profile = require('../model/Profile')

module.exports = {
    async index(req, res) {
        return res.render("profile", { profile: await Profile.get() })
    },
    async update(req, res) {
        //req.body to have data
        const data = req.body

        //define weeks per year: 52
        const weeksPerYear = 52

        //remove vacation weeks per year
        //how much hours per week working
        const weeksPerMonth = (weeksPerYear - data["vacation-per-year"]) / 12

        //total work hours monthly
        const weekTotalHours = data["hours-per-day"] * data["days-per-week"]

        //hours per month
        const monthlyTotalHours = weekTotalHours * weeksPerMonth

        //hour value
        const hourValue = data["monthly-budget"] / monthlyTotalHours

        const profile = await Profile.get()
        await Profile.update({
            ...profile,
            ...req.body,
            "hour-value": hourValue
        })
        return res.redirect('/profile')
    }
}