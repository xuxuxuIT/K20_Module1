const $ = document.querySelector.bind(document);
const $$ = document.querySelectorAll.bind(document);

let tasks = [];
const addForm = $("#add-form");
const input = $("#todo-input");
const todoList = $("#todo-list");
const addError = $("#add-error");
let currentFilter = "all"; // mac dinh ban dau la all
let filterBtn = $$(".filter-btn");
const emptyState = $("#empty-state");
const progressText = $("#progress-text");
const progressFill = $("#progress-fill");
const clearBtn = $("#clear-completed");

// lang nghe su kien khi submit
addForm.addEventListener("submit", (e) => {
  e.preventDefault();
  handleAddTodo();
});

// kiem tra input khi nhap vao
function handleAddTodo() {
  const value = input.value.trim();

  if (value === "") {
    showError();
    return;
  }

  hideError();
  addTodo(value);
  resetInput();
}

function showError() {
  addError.hidden = false;
}

function hideError() {
  addError.hidden = true;
}

// them todo vao mang tasks va render danh sach
function addTodo(value) {
  const newTask = {
    id: Date.now(),
    text: value,
    completed: false,
  };
  tasks.push(newTask);
  renderTodos();
}

// reset input sau khi them thanh cong
function resetInput() {
  input.value = "";
  input.focus(); // tu dong focus vao input khi nhap moi
}

function renderTodos() {
  const filterTasks = filterTask();
  todoList.innerHTML = "";
  updateProgress();
  if (filterTasks.length === 0) {
    emptyState.hidden = false;
    return;
  }
  emptyState.hidden = true;

  filterTasks.forEach((task) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;

    //lay id
    checkbox.addEventListener("change", () => {
      toggleComplete(task.id);
    });

    // tao gach ngang khi task duoc nhan hoan thanh
    const span = document.createElement("span");
    span.textContent = task.text;
    if (task.completed) {
      span.style.textDecoration = "line-through";
    }

    span.addEventListener("dblclick", () => {
      enterEditMode(li, task, span);
    });

    li.appendChild(checkbox);
    li.appendChild(span);
    todoList.appendChild(li);
  });
}

// bat che do chinh sua: thay span bang input
function enterEditMode(li, task, span) {
  const editInput = document.createElement("input");
  editInput.type = "text";
  editInput.value = task.text;
  editInput.className = "edit-input";

  li.replaceChild(editInput, span);
  editInput.focus();
  editInput.select();

  const editError = document.createElement("p");
  editError.className = "field-error edit-error";
  editError.textContent = "Vui lòng nhập nội dung todo!";
  editError.hidden = true;
  li.appendChild(editError);

  editInput.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
      saveEdit(task, editInput, editError);
    }
    if (e.key === "Escape") {
      cancelEdit();
    }
  });

  editInput.addEventListener("blur", () => {
    saveEdit(task, editInput, editError);
  });
}

// luu noi dung todo sau khi sua
function saveEdit(task, editInput, editError) {
  const newValue = editInput.value.trim();

  if (newValue === "") {
    editError.hidden = false;
    return;
  }

  task.text = newValue;
  renderTodos();
}

// huy chinh sua, giu nguyen noi dung cu
function cancelEdit() {
  renderTodos();
}

// doi trang thai hoan thanh cua task
function toggleComplete(id) {
  const task = tasks.find((t) => t.id === id);
  task.completed = !task.completed;
  renderTodos();
}

// lang nghe su kien tren cac nut filter
filterBtn.forEach((btn) => {
  btn.addEventListener("click", () => {
    currentFilter = btn.dataset.filter; // lay gia tri tu data-filter;
    setActiveButton(btn);
    renderTodos();
  });
});

// highlight nut dang active
function setActiveButton(activeBtn) {
  filterBtn.forEach((btn) => {
    btn.classList.remove("active");
  });

  activeBtn.classList.add("active");
}

// loc cac task theo currentFilter
function filterTask() {
  if (currentFilter === "active") {
    return tasks.filter((task) => !task.completed); // cac task chua hoan thanh
  }
  if (currentFilter === "completed") {
    return tasks.filter((task) => task.completed);
  }
  return tasks; // all
}

// hama tinh va hien thi so lieu
function updateProgress() {
  const total = tasks.length;
  const completedCount = tasks.filter((task) => task.completed).length;

  progressText.textContent = `${completedCount}/${total} mục đã hoàn thành`;

  const percent = total === 0 ? 0 : (completedCount / total) * 100;
  progressFill.style.width = `${percent}%`;

  clearBtn.hidden = completedCount === 0;
}

// nut xoa tat ca "completed"
clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((task) => !task.completed);
  renderTodos();
});
