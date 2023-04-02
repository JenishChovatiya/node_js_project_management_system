const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const TaskData = mongoose.model('CreateTask');
const bcrypt = require('bcrypt');
const { json } = require('body-parser');

// const modelForProject = require('../models/CreateProject');

router.get('/taskData', (req,res,next) =>{
    TaskData.find()
    .then(result => {
        res.send({
            Task_Avaialbe : result
        });
    })
    .catch(err => {
        console.log("Error : ", err);
    })

  
})

router.post('/createTask', (req, res) => {
    const {  ProjectId,TaskId,TaskName, TaskDetails,TaskStartDate,TaskEndDate, TaskHourlyWage, AssignedTo,ProjectStatus,TaskOverallCost} = req.body;

    TaskData.findOne({ taskid: TaskId }) 
    .then(async (saveTask)=> {
        console.log(saveTask)
        if(saveTask){
            return res.status(422).send({ error: "Task already exists" });
        }

        const task = new TaskData({
            ProjectId,
            TaskId,
            TaskName, 
            TaskDetails,
            TaskStartDate,
            TaskEndDate, 
            TaskHourlyWage, 
            AssignedTo,
            ProjectStatus,
            TaskOverallCost
        });

        try{
            await task.save();
            res.send({ message: "Task created successfully" });
        }
        catch (err){
            return res.status(422).send({ error: err.message });
            console.log("Error : = ")
        }
    });
});



router.put('/updateTask/:id', async (req, res) => {
  const {
    ProjectId,
    TaskId,
    TaskName,
    TaskDetails,
    TaskStartDate,
    TaskEndDate,
    TaskHourlyWage,
    AssignedTo,
    ProjectStatus,
    TaskOverallCost
    

  } = req.body;
  try {
    const task = await TaskData.findOneAndUpdate(
      { TaskId: parseInt(req.params.id) },
      {
        ProjectId,
        TaskId,
        TaskName,
        TaskDetails,
        TaskStartDate,
        TaskEndDate,
        TaskHourlyWage,
        AssignedTo,
        ProjectStatus,
        TaskOverallCost
       
       
      },
      { new: true }
    );
    if (task) {
      res.send({ message: 'Task updated successfully', task });
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  } catch (err) {
    console.error('Error while updating task:', err);
    res.status(500).send({ error: 'Error while updating task' });
  }
});




router.put('/updateTask/byUser/:id', async (req, res) => {
  const {
    ProjectId,
    TaskId,
    TaskName,
    TaskDetails,
    TaskStartDate,
    TaskEndDate,
    TaskHourlyWage,
    AssignedTo,
    ProjectStatus,
    TaskOverallCost
  } = req.body;
  try {
    const task = await TaskData.findOneAndUpdate(
      { TaskId: parseInt(req.params.id) },
      {
        ProjectId,
        TaskId,
        TaskName,
        TaskDetails,
        TaskStartDate,
        TaskEndDate,
        TaskHourlyWage,
        AssignedTo,
        ProjectStatus,
        TaskOverallCost
      },
      { new: true }
    );
    if (task) {
      res.send({ message: 'Task updated successfully', task });
    } else {
      res.status(404).send({ error: 'Task not found' });
    }
  } catch (err) {
    console.error('Error while updating task:', err);
    res.status(500).send({ error: 'Error while updating task' });
  }
});

router.delete("/deleteData/:id", async (req, res) => {
    try {
      const result = await TaskData.deleteOne({ TaskId: parseInt(req.params.id) });
      if (result.deletedCount > 0) {
        res.send("Data is deleted");
      } else {
        res.status(404).send("Data not found");
      }
    } catch (err) {
      console.error("Error while deleting data:", err);
      res.status(500).send("Error while deleting data");
    }
  });



module.exports = router;