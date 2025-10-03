document.addEventListener("DOMContentLoaded", () => {
  const taskForm = document.getElementById("task-form");
  const taskList = document.getElementById("task-list");
  const searchBar = document.getElementById("search-bar");
  const toggleTheme = document.getElementById("toggle-theme");
  let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

  const renderTasks = () => {
    taskList.innerHTML = "";
    const currentDate = new Date();

    tasks.forEach((task, index) => {
      const taskDeadline = new Date(task.deadline);
      const taskStartDate = new Date(task.startDate);
      const isMissed = currentDate > taskDeadline && !task.completed;
      const isLate = currentDate > taskDeadline && task.completed;

      const row = document.createElement("tr");

      if (isMissed) {
        row.className = "missed-task";
      } else if (isLate) {
        row.className = "late-task";
      } else if (task.completed) {
        row.className = "completed-task";
      }

      row.innerHTML = `
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${task.name}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${taskStartDate.toLocaleString()}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${taskDeadline.toLocaleString()}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${task.priority}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${task.category}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${
        isMissed
          ? "Missed"
          : isLate
          ? "Late"
          : task.completed
          ? "Completed"
          : "Pending"
      }</td>
                  <td>
                      <button onclick="toggleCompletion(${index})">${
        task.completed ? "Unmark" : "Complete"
      }</button>
                      <button onclick="editTask(${index})">Edit</button>
                      <button onclick="deleteTask(${index})">Delete</button>
                  </td>
              `;
      taskList.appendChild(row);
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
  };

  taskForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const task = {
      name: document.getElementById("task-name").value,
      startDate: document.getElementById("start-date").value,
      deadline: document.getElementById("deadline-date").value,
      priority: document.getElementById("priority").value,
      category: document.getElementById("category").value,
      completed: false,
    };
    tasks.push(task);
    renderTasks();
    taskForm.reset();
  });

  window.editTask = (index) => {
    const task = tasks[index];
    document.getElementById("task-name").value = task.name;
    document.getElementById("start-date").value = task.startDate;
    document.getElementById("deadline-date").value = task.deadline;
    document.getElementById("priority").value = task.priority;
    document.getElementById("category").value = task.category;
    tasks.splice(index, 1);
    renderTasks();
  };

  window.deleteTask = (index) => {
    tasks.splice(index, 1);
    renderTasks();
  };

  window.toggleCompletion = (index) => {
    tasks[index].completed = !tasks[index].completed;
    renderTasks();
  };

  searchBar.addEventListener("input", () => {
    const query = searchBar.value.toLowerCase();
    const filteredTasks = tasks.filter(
      (task) =>
        task.name.toLowerCase().includes(query) ||
        task.category.toLowerCase().includes(query)
    );
    taskList.innerHTML = "";
    filteredTasks.forEach((task, index) => {
      const taskDeadline = new Date(task.deadline);
      const taskStartDate = new Date(task.startDate);
      const isMissed = new Date() > taskDeadline && !task.completed;
      const isLate = new Date() > taskDeadline && task.completed;

      const row = document.createElement("tr");

      if (isMissed) {
        row.className = "missed-task";
      } else if (isLate) {
        row.className = "late-task";
      } else if (task.completed) {
        row.className = "completed-task";
      }

      row.innerHTML = `
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${task.name}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${taskStartDate.toLocaleString()}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${taskDeadline.toLocaleString()}</td>
                  <td>${task.priority}</td>
                  <td>${task.category}</td>
                  <td style="${
                    task.completed || isLate
                      ? "text-decoration: line-through;"
                      : ""
                  }">${
        isMissed
          ? "Missed"
          : isLate
          ? "Late"
          : task.completed
          ? "Completed"
          : "Pending"
      }</td>
                  <td>
                      <button onclick="editTask(${index})">Edit</button>
                      <button onclick="deleteTask(${index})">Delete</button>
                      <button onclick="toggleCompletion(${index})">${
        task.completed ? "Unmark" : "Complete"
      }</button>
                  </td>
              `;
      taskList.appendChild(row);
    });
  });

  toggleTheme.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });

  renderTasks();
});
