const mongoose = require('mongoose');

const TaskSchema = new mongoose.Schema({
    ProjectId: String,
    TaskId: { type: String, unique: true },
    TaskName: String,
    TaskDetails: String,
    TaskStartDate: String,
    TaskEndDate: String,
    TaskHourlyWage: Number,
    AssignedTo: String,
    ProjectStatus: String,
    TaskOverallCost: Number

})

module.exports =  mongoose.model("CreateTask", TaskSchema);