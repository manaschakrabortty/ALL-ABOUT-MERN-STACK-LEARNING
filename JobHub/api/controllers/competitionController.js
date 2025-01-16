const Competition = require('../models/Competition')

module.exports.getAllCompetitions = async (req, res) => {
    try {
        let compType = req.query.type?.split(",")
        let compMode = req.query.mode?.split(",")
        let compEligibility = req.query.eligibility?.split(",")

        let dbQuery = {}
        if (compType?.length)     dbQuery.type = { $in: compType }
        if (compMode?.length)     dbQuery.mode = { $in: compMode }
        if (compEligibility?.length)     dbQuery.eligibility = { $in: compEligibility }

        const competitions = await Competition.find(dbQuery).sort({createdAt: -1})

        res.json(competitions)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports.createCompetition = async (req, res) => {
    try {
        const newCompetition = new Competition(req.body)
        await newCompetition.save()
        res.json(newCompetition)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(arr)
    }
}