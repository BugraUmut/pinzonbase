const mongoose = require('mongoose')
const findOrCreate = require('mongoose-find-or-create')

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})
userSchema.plugin(findOrCreate)

module.exports = mongoose.model('User', userSchema)