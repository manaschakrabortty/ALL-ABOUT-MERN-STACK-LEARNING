const mongoose = require('mongoose')
const Schema = mongoose.Schema

const jobSchema = new Schema({
    title: { type: String, required: true },
    company: { type: String, required: true },
    country: { type: String, required: true },
    mode: { type: String, required: true },
    location: [String],
    skills: [String],
    eligibleBatches: [String],
    duration: String,
    requiredExperience: String,
    startDate: String,
    stipend: Number,
    salary: Number,
    type: String,
    role: String,
    deadline: String,
    applyLink: String
}, {timestamps: true})

module.exports = mongoose.model('Job', jobSchema)