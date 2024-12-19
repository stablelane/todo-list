
const taskText = document.getElementById('task-text');
const taskList = document.getElementById('task-list');

// Fetch and display tasks on page load
document.addEventListener('DOMContentLoaded', fetchTasks);

document.addEventListener('click', (e) => {
    if (e.target.id === 'task-submit-btn') {
        makeTask(e);
    } else if (e.target.classList.contains('checkbox')) {
        strikeTask(e.target.id);
    } else if (e.target.classList.contains('delete-btn')) {
        deleteTask(e.target.id);
    }
});

// Add an event listener for "Enter" key
document.addEventListener('keypress', (e) => {
    if (e.key === 'Enter' && e.target.id === 'task-text') {
        makeTask(e);
    }
});
// get jwt from local storage 
const token = localStorage.getItem('token')
// Fetch all tasks from the backend and render them
async function fetchTasks() {
    try {
        const response = await fetch('/tasks', {
            method: 'GET',
            headers: {
                'Authorization': `Bearer ${token}`, // Include the token in the Authorization header
                'Content-Type': 'application/json'
            }
        });
        const tasks = await response.json();
        tasks.forEach(renderTask);
    } catch (err) {
        console.error('Error fetching tasks:', err);
    }
}

// Create a task on the backend and render it
async function makeTask(e) {
    e.preventDefault();
    if (taskText.value.trim() !== '') {
        try {
            const response = await fetch('/tasks', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ text: taskText.value }),
            });
            const newTask = await response.json();
            renderTask(newTask);
            clearInput();
        } catch (err) {
            console.error('Error creating task:', err);
        }
    }
}

// Render a single task in the task list
function renderTask(task) {
    taskList.innerHTML += `<div id='${task._id}-task' class="task">
                               <input id='${task._id}' class='checkbox' type="checkbox" ${task.isCompleted ? 'checked' : ''}>
                               <p id='${task._id}-taskID'>${task.text}</p>
                               <img id="${task._id}" class='delete-btn' src="icon/bin.png" alt="Delete">
                           </div>`;
}

// Clear the input field after task submission
function clearInput() {
    taskText.value = '';
}

// Delete a task from the backend and remove it from the DOM
async function deleteTask(id) {
    try {
        await fetch(`/tasks/${id}`, { method: 'DELETE' });
        document.getElementById(`${id}-task`).remove();
    } catch (err) {
        console.error('Error deleting task:', err);
    }
}

// Strike through a task and update its completion status on the backend
async function strikeTask(id) {
    const checkbox = document.getElementById(id);
    const isCompleted = checkbox.checked;
    try {
        await fetch(`/tasks/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ isCompleted }),
        });
        document.getElementById(`${id}-task`).classList.toggle('strike', isCompleted);
    } catch (err) {
        console.error('Error updating task:', err);
    }
}


