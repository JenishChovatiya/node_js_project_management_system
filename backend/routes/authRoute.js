const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');
const UserData = mongoose.model('UserData');
const bcrypt = require('bcrypt');

router.post('/signUp', (req, res) => {
    const { name, email, password, confirm } = req.body;

    UserData.findOne({ email: email }) 
    .then(async (savedUser)=> {
        console.log(savedUser)
        if(savedUser){
            return res.status(422).send({ error: "User already exists" });
        }

        const user = new UserData({
            name,
            email,
            password,
            confirm
        });

        try{
            await user.save();
            res.send({ message: "User saved successfully" });
        }
        catch (err){
            return res.status(422).send({ error: err.message });
        }
    });
});

module.exports = router;