document.addEventListener("DOMContentLoaded", () => {
    let todos = [];
    let currentFilter = "all";
    let nextId = 1;
    const form = document.getElementById("add-form");
    const input = document.getElementById("todo-input");
    const addError = document.getElementById("add-error");
    const filtersEl = document.getElementById("filters");
    const listEl = document.getElementById("todo-list");
    const emptyState = document.getElementById("empty-state");
    const progressText = document.getElementById("progress-text");
    const progressFill = document.getElementById("progress-fill");
    const clearBtn = document.getElementById("clear-completed");

    function getFilteredTodos() {
        if (currentFilter === "active") return todos.filter((t) => !t.completed);
        if (currentFilter === "completed") return todos.filter((t) => t.completed);
        return todos;
    }

    function render() {
        const filtered = getFilteredTodos();
        listEl.innerHTML = "";
        if (filtered.length === 0) {
            emptyState.hidden = false;
        } else {
            emptyState.hidden = true;
            filtered.forEach((todo) => listEl.appendChild(buildTodoElement(todo)));
        }
        renderFooter();
    }

    function buildTodoElement(todo) {
        const li = document.createElement("li");
        li.className = "todo-item" + (todo.completed ? " is-completed" : "");
        li.dataset.id = todo.id;
        li.innerHTML = `
        <label class="checkbox-wrap">
          <input type="checkbox" class="todo-checkbox" ${todo.completed ? "checked" : ""}>
          <span class="checkbox-visual"></span>
        </label>
        <span class="todo-text ${todo.completed ? "completed" : ""}">${escapeHtml(todo.text)}</span>
        <span class="stamp">XONG</span>
        <button type="button" class="btn-delete" aria-label="Xoá">✕</button>
      `;
        return li;
    }

    function renderFooter() {
        const total = todos.length;
        const completed = todos.filter((t) => t.completed).length;
        progressText.textContent = `${completed}/${total} mục đã hoàn thành`;
        progressFill.style.width =
            total === 0 ? "0%" : `${(completed / total) * 100}%`;
        clearBtn.hidden = completed === 0;
    }

    function escapeHtml(str) {
        const div = document.createElement("div");
        div.textContent = str;
        return div.innerHTML;
    }
    // add todo
    function showAddError(show) {
        addError.hidden = !show;
        input.classList.toggle("has-error", show);
    }

    form.addEventListener("submit", (e) => {
        e.preventDefault();
        const value = input.value.trim();

        if (value.length === 0) {
            showAddError(true);
            return;
        }
        showAddError(false);
        todos.push({ id: nextId++, text: value, completed: false });
        input.value = "";
        input.focus();
        render();
    });

    // Ẩn thông báo lỗi ngay khi người dùng bắt đầu gõ lại
    input.addEventListener("input", () => {
        if (addError.hidden === false) showAddError(false);
    });
    // filter
    filtersEl.addEventListener("click", (e) => {
        const btn = e.target.closest(".filter-btn");
        if (!btn) return;
        currentFilter = btn.dataset.filter;
        filtersEl
            .querySelectorAll(".filter-btn")
            .forEach((b) => b.classList.remove("active"));
        btn.classList.add("active");

        render();
    });
    //   checkbox bắt sự kiện
    listEl.addEventListener("change", (e) => {
        if (!e.target.classList.contains("todo-checkbox")) return;

        const li = e.target.closest(".todo-item");
        const id = Number(li.dataset.id);
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        todo.completed = e.target.checked;
        render();
    });
    // click bắt nút xóa
    listEl.addEventListener("click", (e) => {
        const deleteBtn = e.target.closest(".btn-delete");
        if (deleteBtn) {
            handleDelete(deleteBtn.closest(".todo-item"));
            return;
        }
    });

    //double click sửa nội dung
    listEl.addEventListener("dblclick", (e) => {
        const textEl = e.target.closest(".todo-text");
        if (!textEl) return;
        startEdit(textEl.closest(".todo-item"));
    });
    // xóa
    function handleDelete(li) {
        const id = Number(li.dataset.id);
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        const ok = window.confirm(`Xoá "${todo.text}"?`);
        if (!ok) return;
        softRemove(li, id);
    }

    function softRemove(li, id) {
        li.classList.add("removing");
        li.addEventListener(
            "transitionend",
            function handler() {
                li.removeEventListener("transitionend", handler);
                todos = todos.filter((t) => t.id !== id);
                render();
            },
            { once: true },
        );
    }
    // sửa todo list
    function startEdit(li) {
        const id = Number(li.dataset.id);
        const todo = todos.find((t) => t.id === id);
        if (!todo) return;
        const textEl = li.querySelector(".todo-text");
        const oldValue = todo.text;
        const inputEl = document.createElement("input");
        inputEl.type = "text";
        inputEl.className = "todo-edit-input";
        inputEl.value = oldValue;
        textEl.replaceWith(inputEl);
        inputEl.focus();
        inputEl.select();
        let finished = false;
        function showEditError(msg) {
            let err = li.querySelector(".field-error");
            if (!err) {
                err = document.createElement("p");
                err.className = "field-error";
                li.appendChild(err);
            }
            err.textContent = msg;
            err.hidden = false;
        }

        function clearEditError() {
            const err = li.querySelector(".field-error");
            if (err) err.remove();
        }

        function saveEdit() {
            if (finished) return;
            const newValue = inputEl.value.trim();

            if (newValue.length === 0) {
                showEditError("Vui lòng nhập nội dung todo!");
                inputEl.focus();
                return;
            }

            finished = true;
            todo.text = newValue;
            render();
        }

        function cancelEdit() {
            if (finished) return;
            finished = true;
            render();
        }

        inputEl.addEventListener("keydown", (e) => {
            if (e.key === "Enter") {
                e.preventDefault();
                saveEdit();
            } else if (e.key === "Escape") {
                e.preventDefault();
                cancelEdit();
            } else {
                clearEditError();
            }
        });

        inputEl.addEventListener("blur", () => {
            saveEdit();
        });
    }

    //xóa tất cả đã hoàn thành
    clearBtn.addEventListener("click", () => {
        const completedCount = todos.filter((t) => t.completed).length;
        if (completedCount === 0) return;

        const ok = window.confirm(`Xoá ${completedCount} việc đã hoàn thành?`);
        if (!ok) return;

        todos = todos.filter((t) => !t.completed);
        render();
    });

    render();
});
