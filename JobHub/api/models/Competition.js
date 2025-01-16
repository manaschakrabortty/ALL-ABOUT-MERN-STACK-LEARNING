const mongoose = require('mongoose')
const Schema = mongoose.Schema

const competitionSchema = new Schema({
    title: String,
    company: String,
    country: String,
    eligibility: String,
    mode: String,
    type: String,
    prize: String,
    deadline: String,
    applyLink: String
}, {timestamps: true})

module.exports = mongoose.model('Competition', competitionSchema)
