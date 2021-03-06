const UserData = require('../models/userdata')
const User = require('../models/user')
const Project = require('../models/project')
const bcrypt = require('bcrypt')
const passport = require('passport')

function apiGET(req, res) { res.send("GET request does not do anything. Switch to POST instead") }

function apiPOST(req, res) {
    if(req.body.requestType == "save") {
        update(req, res)
    } else if(req.body.requestType == "load") {
        loadData(req, res)
    } else {
        res.send("Wrong Request Type")
    }
}

async function update(req, res) {
    let isLogged = await login(req.body.username, req.body.password)
    console.log("isLogged: " + isLogged)
    if(!isLogged) return res.send("Wrong Username Or Password")

    await Project.find({_id: req.body.projectId}, (error, result) => {
        if(error) return res.send("error")

        if(!result[0]) { return res.send("Wrong Project ID") }
        else {
            UserData.updateOne({ projectId: req.body.projectId, deviceId: req.body.deviceId }, { projectId: req.body.projectId, deviceId: req.body.deviceId, userData: req.body.userData}, { upsert: true }, (err) => {
                if(err) return console.log("Error: " + err)

                return res.send("Saved Successfully")
            })
        }
    })
}

async function loadData(req, res) {
    let isLogged = await login(req.body.username, req.body.password)
    if(!isLogged) return res.send("Wrong Username Or Password")

    await Project.find({ _id: req.body.projectId }, (error, result) => {
        if(error) return res.send("error")

        if(!result[0]) { return res.send("Wrong Project ID") }
        else {
            UserData.find({ projectId: req.body.projectId, deviceId: req.body.deviceId }, (err, _result) => {
                if(err) return res.send("error")

                if(!_result[0]) {
                    UserData.updateOne({ projectId: req.body.projectId, deviceId: req.body.deviceId }, { projectId: req.body.projectId, deviceId: req.body.deviceId, userData: "{}"}, { upsert: true }, (err) => {
                        if(err) return console.log("Error: " + err)

                        return res.send("New user data created Successfully.")
                    })
                    return;
                } else {
                    res.send(_result[0].userData)
                }
            })
        }
    })
}

async function login(username, password) {
  const loginStatus = await User.findOne({ username: username }, (err, user) => {
    console.log("-----------USER------------\n" + user + "\n---------------------")
      if(err) {return 0}
      if(!user) {return 0}

      const isPasswordTrue = bcrypt.compareSync(password, user.password)
      console.log("isPasswordTrue: " + isPasswordTrue)
      if(isPasswordTrue) {return 1}
      else {return 0}
  })

  return loginStatus
}

module.exports = {
    apiPOST,
    apiGET
}
