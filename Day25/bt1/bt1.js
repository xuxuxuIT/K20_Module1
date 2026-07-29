const input = document.getElementById("todo-input");
const addBtn = document.getElementById("add-btn");
const todoList = document.getElementById("todo-list");
const todoCount = document.getElementById("todo-count");

// cap nhat so viec chua xong
function updateCount() {
  const items = todoList.querySelectorAll("li");
  let count = 0;

  items.forEach((item) => {
    if (!item.classList.contains("completed")) {
      count++;
    }
  });

  todoCount.textContent = `Còn ${count} việc chưa xong`;
}

// bao trung
function duplicateEffect() {
  input.style.border = "2px solid red";

  setTimeout(() => {
    input.style.border = "";
  }, 800);
}

// them cong viec
function addTodo() {
  const text = input.value.trim();
  if (text === "") {
    input.value = "";
    return;
  }

  // kiem tra trung
  const spans = todoList.querySelectorAll("span");

  for (const span of spans) {
    if (span.textContent === text) {
      duplicateEffect();
      input.value = "";
      return;
    }
  }

  // tao phan tu
  const li = document.createElement("li");
  const span = document.createElement("span");
  span.textContent = text;
  const deleteBtn = document.createElement("button");
  deleteBtn.textContent = "Xóa";
  li.appendChild(span);
  li.appendChild(deleteBtn);

  span.addEventListener("click", () => {
    li.classList.toggle("completed");
    updateCount();
  });

  // nut xoa
  deleteBtn.addEventListener("click", () => {
    li.remove();
    updateCount();
  });

  todoList.appendChild(li);
  input.value = "";
  updateCount();
}

//nut them
addBtn.addEventListener("click", addTodo);

//nhan enter
input.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTodo();
  }
});

updateCount();
