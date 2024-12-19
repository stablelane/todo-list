const express = require('express')
const mongoose = require('mongoose')
const app = express()
const Task = require('./models/task')
const User = require('./models/user')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { status } = require('express/lib/response')
require('dotenv').config()

mongoose.connect('mongodb://localhost/taskdb')
    .then(() => app.listen(() => console.log(`Server running`)))
    .catch(err => console.error(err));

app.set('view engine', 'ejs')
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false}))
app.use(express.json()); // Parse JSON requests

app.get('/', (req,res) => {
    res.render('login')
})
app.get('/index', (req,res) => {
    res.render('index')
})
// Add a task
app.post('/tasks', async (req, res) => {
    try {
        const task = new Task({ text: req.body.text });
        await task.save();
        res.status(201).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Get all tasks
app.get('/tasks', async (req, res) => {
    try {
        const tasks = await Task.find();
        res.status(200).json(tasks);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Update a task (e.g., toggle completion)
app.put('/tasks/:id', async (req, res) => {
    try {
        const task = await Task.findByIdAndUpdate(
            req.params.id,
            { isCompleted: req.body.isCompleted },
            { new: true }
        );
        res.status(200).json(task);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

// Delete a task
app.delete('/tasks/:id', async (req, res) => {
    try {
        await Task.findByIdAndDelete(req.params.id);
        res.status(204).send();
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


//login

app.post('/login', async (req, res) => {
    
    try {
        const user = await User.findOne({ username: req.body.username})
        if (await bcrypt.compare(req.body.password, user.password)) {
            console.log("password is correct")
            // res.render('index')
            const accessToken = jwt.sign(user.id, process.env.ACCESS_TOKEN_SECRET)
            res.json({ accessToken: accessToken})
        } else {
            res.status(401).json({ message: 'Incorrect username or password' });
        }

    } catch (error) {
        res.status(403).json({ error: error.message})
    }

})

//jwt authentication midddleware


app.listen(process.env.PORT || 5000)