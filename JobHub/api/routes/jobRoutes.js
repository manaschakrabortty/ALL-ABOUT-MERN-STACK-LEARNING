const express = require('express')
const router = express.Router()
const jobController = require('../controllers/jobController')

router.route('/')
    .get(jobController.getAllJobs)
    .post(jobController.createJob)

module.exports = router