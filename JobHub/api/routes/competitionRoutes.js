const express = require('express')
const router = express.Router()
const competitionController = require('../controllers/competitionController')

router.route('/')
    .get(competitionController.getAllCompetitions)
    .post(competitionController.createCompetition)

module.exports = router