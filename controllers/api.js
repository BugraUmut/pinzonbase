const UserData = require('../models/userdata')
const Project = require('../models/project')

async function update(req, res) {
    console.log("STARTEDLOOOOOOOOOL")
    await Project.find({_id: req.body.projectId}, (error, result) => {
        if(error) return res.send("error")
        
        if(!result[0]) { return res.send("Wrong Project ID") } 
        else {
            UserData.updateOne({ projectId: req.body.projectId, deviceId: req.body.deviceId }, { projectId: req.body.projectId, deviceId: req.body.deviceId, userData: req.body.userData}, { upsert: true }, (err) => {
                if(err) return console.log(err)

                res.send("Saved Successfully")
            })
        }
    })
}

module.exports = {
    update
}