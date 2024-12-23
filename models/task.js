const mongoose = require('mongoose');

// Define the Task schema
const taskSchema = new mongoose.Schema({
    text: {
        type: String,
        required: true,
        trim: true, 
    },
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },    
    isCompleted: {
        type: Boolean,
        default: false, 
    },
    createdAt: {
        type: Date,
        default: Date.now, 
    },
});

// Create the Task model
const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
