(() => {
  const todoForm = document.getElementById('todo-form');
  const todoInput = document.getElementById('todo-input');
  const todoList = document.getElementById('todo-list');
  const taskCount = document.getElementById('task-count');
  const emptyMessage = document.getElementById('empty-message');
  const themeToggle = document.getElementById('theme-toggle');

  let todos = JSON.parse(localStorage.getItem('todos')) || [];

  function saveTodos() {
    localStorage.setItem('todos', JSON.stringify(todos));
  }

  function renderTodos() {
    todoList.innerHTML = '';
    emptyMessage.style.display = todos.length === 0 ? 'block' : 'none';

    // Count only incomplete tasks
    const remaining = todos.filter(todo => !todo.completed).length;

    // Update task count text
    if (todos.length === 0) {
      taskCount.textContent = '';
    } else if (remaining === 0) {
      taskCount.textContent = 'All done! 🎉';
    } else {
      taskCount.textContent = `${remaining} task${remaining !== 1 ? 's' : ''} left`;
    }

    todos.forEach((todo, index) => {
      const li = document.createElement('li');

      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.checked = todo.completed;
      checkbox.addEventListener('change', () => {
        todos[index].completed = checkbox.checked;
        saveTodos();
        renderTodos();
      });

      const span = document.createElement('span');
      span.textContent = todo.text;
      span.classList.toggle('completed', todo.completed);

      const deleteBtn = document.createElement('button');
      deleteBtn.textContent = '✕';
      deleteBtn.title = 'Delete task';
      deleteBtn.className = 'delete-btn';
      deleteBtn.addEventListener('click', () => {
        todos.splice(index, 1);
        saveTodos();
        renderTodos();
      });

      li.appendChild(checkbox);
      li.appendChild(span);
      li.appendChild(deleteBtn);
      todoList.appendChild(li);
    });
  }

  todoForm.addEventListener('submit', e => {
    e.preventDefault();
    const text = todoInput.value.trim();
    if (!text) return;
    todos.push({ text, completed: false });
    saveTodos();
    renderTodos();
    todoInput.value = '';
  });

  themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark');
    themeToggle.textContent = document.body.classList.contains('dark') ? '☀️ Light Mode' : '🌙 Dark Mode';
  });

  renderTodos();
})();
