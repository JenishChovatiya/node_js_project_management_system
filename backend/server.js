const express = require("express");
const { default: mongoose } = require("mongoose");
const port = 4000;


const app = express();


//Declaring database as require
require('./db')
require('./models/UserData')
require('./models/CreateProject')
require('./models/CreateTask')

const authRoute = require('./routes/authRoute');
const createProject = require('./routes/createProjectRoute');
const createTask = require('./routes/createTaskRoute');


app.use(express.json());
app.use(authRoute);
app.use(createProject);
app.use(createTask);


app.get('/', (req, res) => {
    res.send("Hello There");
})

app.post('/signUp', (req, res) => {
    console.log(req.body);
    res.send("Sign Up API Called");

})

app.post('/createProject', (req, res) => {
    console.log(req.body);
    res.send("Create Project API Called");
})



app.delete('/deleteData/:id', (req, res) => {
    console.log(req.body);
    res.send("Create Project API Called");
})


app.put('/updateTask/byUser/:id', (req,res) => {
    console.log("Done");
    res.send("API Called");
})


app.listen(port,  async ()=> {
    console.log("Server started " + port)
})
