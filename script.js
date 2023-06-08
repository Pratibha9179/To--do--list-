const todoForm = document.getElementById('todo-form');
const taskTitleInput = document.getElementById('task-title-input');
const taskDescInput = document.getElementById('task-desc-input');
const pendingTasksList = document.getElementById('pending-tasks-list');
const completedTasksList = document.getElementById('completed-tasks-list');

let tasks = [];

todoForm.addEventListener('submit', function(event) {
  event.preventDefault();
  const taskTitle = taskTitleInput.value.trim();
  const taskDesc = taskDescInput.value.trim();
  if (taskTitle === '') {
    alert('Please fill out the title box.');
    return;
  }
  const task = {
    title: taskTitle,
    description: taskDesc,
    completed: false,
    timestamp: new Date()
  };
  tasks.push(task);
  renderTasks();
  taskTitleInput.value = '';
  taskDescInput.value = '';
});

// Mark task as complete
function completeTask(index) {
  tasks[index].completed = true;
  renderTasks();
}

// Delete task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Render tasks
function renderTasks() {
  pendingTasksList.innerHTML = '';
  completedTasksList.innerHTML = '';

  tasks.forEach((task, index) => {
    const taskItem = document.createElement('li');
    taskItem.classList.add('task-item');
    if (task.completed) {
      taskItem.classList.add('completed');
    }

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = task.completed;
    checkbox.addEventListener('change', function() {
      completeTask(index);
    });
    taskItem.appendChild(checkbox);

    const taskTitle = document.createElement('span');
    taskTitle.classList.add('task-title');
    taskTitle.textContent = task.title;
    taskItem.appendChild(taskTitle);

    const taskDesc = document.createElement('p');
    taskDesc.classList.add('task-description');
    taskDesc.textContent = task.description;
    taskItem.appendChild(taskDesc);

    const taskActions = document.createElement('div');
    taskActions.classList.add('task-actions');

    const editButton = document.createElement('span');
    editButton.classList.add('edit-btn');
    editButton.textContent = 'Edit';
    editButton.addEventListener('click', function() {
      const newTitle = prompt('Enter new title:', task.title);
      if (newTitle !== null && newTitle.trim() !== '') {
        tasks[index].title = newTitle;
        renderTasks();
      }
    });
    taskActions.appendChild(editButton);

    const deleteButton = document.createElement('span');
    deleteButton.classList.add('delete-btn');
    deleteButton.textContent = 'Delete';
    deleteButton.addEventListener('click', function() {
      deleteTask(index);
    });
    taskActions.appendChild(deleteButton);

    taskItem.appendChild(taskActions);

    if (task.completed) {
      completedTasksList.appendChild(taskItem);
    } else {
      pendingTasksList.appendChild(taskItem);
    }
  });
}
