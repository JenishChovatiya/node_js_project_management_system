const mongoose = require('mongoose');

const projectSchema = new mongoose.Schema({
    ProjectID: String,
    ProjectName: String,
    ProjectStartDate:String,
    ProjectEndDate:String
})

module.exports =  mongoose.model("CreateProject", projectSchema);