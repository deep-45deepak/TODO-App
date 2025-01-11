document.addEventListener('DOMContentLoaded', () => {

    // DOM manipulation
    const todoInput = document.getElementById("taskInput");
    const addTaskBtn = document.getElementById("addTaskBtn");
    const todoList = document.getElementById("taskList");

    // If local storage has some data, load it
    let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    // Render each task stored in local storage
    tasks.forEach((task) => renderTasks(task));

    addTaskBtn.addEventListener("click", function () {
        const taskText = todoInput.value.trim();
        if (taskText === "") {
            return;
        }
        const newTask = {
            id: Date.now(),
            text: taskText,
            cmplte: false
        };

        // Add the new task to the tasks array
        tasks.push(newTask);

        // Save tasks to local storage
        saveTask();

        // Render the new task
        renderTasks(newTask);

        // Clear the input field
        todoInput.value = "";
    });

    // Function to render a task
    function renderTasks(task) {
        const li = document.createElement("li");
        li.setAttribute("data-id", task.id);
        li.innerHTML = `
        <span>${task.text}</span>
        <button class="delete-btn"><i class="fa-solid fa-eraser"></i></button>
        `;

        // Toggle completion on click (excluding the delete button)
        li.addEventListener("click", (e) => {
            if (e.target.tagName === "BUTTON") return;
            task.cmplte = !task.cmplte;
            li.classList.toggle('cmplte');
            saveTask();
        });

        // Delete task on button click
        li.querySelector('button').addEventListener("click", (e) => {
            e.stopPropagation(); // Prevent event bubbling to parent
            const taskId = parseInt(li.getAttribute("data-id")); // Get task ID from li
            tasks = tasks.filter((t) => t.id !== taskId); // Remove task from array
            li.remove(); // Remove the task's li from the DOM
            saveTask(); // Save updated tasks array to local storage
        });

        todoList.appendChild(li);
    }

    // Function to save tasks to local storage
    function saveTask() {
        localStorage.setItem("tasks", JSON.stringify(tasks));
    }
});
