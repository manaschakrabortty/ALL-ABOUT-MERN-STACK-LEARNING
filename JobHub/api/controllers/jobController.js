const Job = require("../models/Job")

module.exports.getAllJobs = async (req, res) => {
    try {
        let jobType = req.query.jobType?.split(",")
        let jobRole = req.query.jobRole?.split(",")
        let jobMode = req.query.jobMode?.split(",")

        let dbQuery = {}
        if (jobType?.length)     dbQuery.type = { $in: jobType }
        if (jobRole?.length)     dbQuery.role = { $in: jobRole }
        if (jobMode?.length)     dbQuery.mode = { $in: jobMode }

        const jobs = await Job.find(dbQuery).sort({createdAt: -1})

        res.json(jobs)
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}

module.exports.createJob = async (req, res) => {
    try {
        let {location, skills, eligibleBatches} = req.body
        let locationArr = location.split(" ")
        let skillsArr = skills.split(" ")
        let eligibleBatchesArr = eligibleBatches.split(" ")

        let formData = {
            ...req.body, 
            location: locationArr, 
            skills: skillsArr, 
            eligibleBatches: eligibleBatchesArr
        }
        
        const newJob = new Job(formData)
        await newJob.save()

        res.json({"message": "Job created successfully"})
    }
    catch (err) {
        console.log(err)
        res.status(500).json(err)
    }
}