const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const ProjectData = mongoose.model('CreateProject');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

// const modelForProject = require('../models/CreateProject');

router.get('/calledData', (req,res,next) =>{
    ProjectData.find()
    .then(result => {
        res.send({
            Projects_Available : result
        });
    })
    .catch(err => {
        console.log("Error : ", err);
    })

  
})

router.post('/createProject', (req, res) => {
    const { ProjectID, ProjectName, ProjectStartDate, ProjectEndDate } = req.body;

    ProjectData.findOne({ projectid: ProjectID }) 
    .then(async (saveProject)=> {
        console.log(saveProject)
        if(saveProject){
            return res.status(422).send({ error: "Project already exists" });
        }

        const project = new ProjectData({
            ProjectID, 
            ProjectName,
            ProjectStartDate,
            ProjectEndDate
        });

        try{
            await project.save();
            res.send({ message: "Project created successfully" });
        }
        catch (err){
            return res.status(422).send({ error: err.message });
            console.log("Error : = ")
        }
    });
});

module.exports = router;