// Function to initialize the application and load tasks from Local Storage
document.addEventListener('DOMContentLoaded', () => {
    loadTasks(); // Load tasks when the page is loaded

    // Select DOM elements
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    // Add event listener to Add Task button
    addButton.addEventListener('click', () => {
        addTask(taskInput.value.trim()); // Add task when the button is clicked
        taskInput.value = ''; // Clear input field
    });

    // Add event listener to handle Enter key press for task input
    taskInput.addEventListener('keypress', (event) => {
        if (event.key === 'Enter') {
            addTask(taskInput.value.trim()); // Add task when Enter key is pressed
            taskInput.value = ''; // Clear input field
        }
    });
});

// Function to load tasks from Local Storage and display them
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks.forEach(taskText => addTask(taskText, false)); // 'false' prevents re-saving
}

// Function to add a task to the list
function addTask(taskText, save = true) {
    if (taskText === '') {
        alert('Please enter a task.');
        return;
    }

    // Create task list item
    const li = document.createElement('li');
    li.textContent = taskText;

    // Create remove button
    const removeButton = document.createElement('button');
    removeButton.textContent = 'Remove';
    removeButton.className = 'remove-btn';
    removeButton.addEventListener('click', () => {
        removeTask(taskText);
        li.remove(); // Remove task item from DOM
    });

    // Append remove button to list item
    li.appendChild(removeButton);

    // Append list item to task list
    document.getElementById('task-list').appendChild(li);

    // Save task to Local Storage
    if (save) {
        const storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
        storedTasks.push(taskText);
        localStorage.setItem('tasks', JSON.stringify(storedTasks));
    }
}

// Function to remove a task from Local Storage
function removeTask(taskText) {
    let storedTasks = JSON.parse(localStorage.getItem('tasks') || '[]');
    storedTasks = storedTasks.filter(task => task !== taskText);
    localStorage.setItem('tasks', JSON.stringify(storedTasks));
}
