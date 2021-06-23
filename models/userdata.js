const mongoose = require('mongoose')

const userDataSchema = new mongoose.Schema({
    projectId: {
        type: String,
        required: true
    },
    deviceId: {
        type: String,
        required: true
    },
    dataJson: {
        type: String,
        required: true
    }
})

module.exports = mongoose.model('UserData', userDataSchema)