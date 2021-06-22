const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
    id: {
        type: String,
        required: true
    },
    projectName: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('Project', projectSchema)