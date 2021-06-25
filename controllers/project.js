const Project = require('../models/project')
const UserData = require('../models/userdata')

async function createProjectPOST(req, res) {
    const projectName = req.body.projectName

    Project.find({ projectName: projectName }, (err, docs) => {
        if(err) return console.log(err)
        console.log(docs)
        if(!docs[0]) {
            const newProject = new Project({
                id: req.user._id,
                projectName: req.body.projectName
            })

            newProject.save();

            res.redirect('/project/')
        } else {
            res.render('project/new', { title: "New Project", error: true})
        }
    })
}

function createProjectGET(req, res) {
    res.render('project/new', {title: "New Project", error: false})
}

async function viewData(req, res) {
    await UserData.find({projectId: req.body.projectId}, (err, docs) => {
        if(err) return console.log(err)
        console.log(docs)
        res.render("project/viewdata", { title: "User Data", data: docs})
    })
}

module.exports = {
    createProjectPOST,
    createProjectGET,
    viewData
}
