document.addEventListener('DOMContentLoaded', () => {

    const taskTitle = document.getElementById('taskTitle');
    const taskDate = document.getElementById('taskDate');
    const taskTime = document.getElementById('taskTime');
    const addTaskBtn = document.getElementById('addTaskBtn');
    const taskList = document.getElementById('taskList');

    let tasks = [];

    
    addTaskBtn.addEventListener('click', () => {
        const title = taskTitle.value.trim();
        const date = taskDate.value;
        const time = taskTime.value;

        if (title === '' || date === '' || time === '') {
            alert('Please fill in all required fields!');
            return;
        }

        const task = {
            id: Date.now(),
            title,
            date,
            time,
            completed: false
        };

        tasks.push(task);
        displayTasks();

        
        taskTitle.value = '';
        taskDate.value = '';
        taskTime.value = '';
    });

  
    function displayTasks() {
        taskList.innerHTML = '';  

        tasks.forEach(task => {
            const li = document.createElement('li');
            li.classList.add('task-item');
            if (task.completed) li.classList.add('completed');

            li.innerHTML = `
                <div>
                    <h3>${task.title}</h3>
                    <small>Due: ${task.date} at ${task.time}</small>
                </div>
                <div class="task-controls">
                    <button class="complete" onclick="toggleComplete(${task.id})">Complete</button>
                    <button class="edit" onclick="editTask(${task.id})">Edit</button>
                    <button class="delete" onclick="deleteTask(${task.id})">Delete</button>
                </div>
            `;

            taskList.appendChild(li);
        });
    }

  
    window.toggleComplete = (id) => {
        tasks = tasks.map(task => {
            if (task.id === id) task.completed = !task.completed;
            return task;
        });
        displayTasks();
    };


    window.editTask = (id) => {
        const task = tasks.find(t => t.id === id);

      
        taskTitle.value = task.title;
        taskDate.value = task.date;
        taskTime.value = task.time;

        
        tasks = tasks.filter(t => t.id !== id);
    };

    window.deleteTask = (id) => {
        tasks = tasks.filter(task => task.id !== id);
        displayTasks();
    };

});
