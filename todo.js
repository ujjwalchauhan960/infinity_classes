const TODO_KEY = "todo";
let todos = [];
const init = () => {
    try {
        const fetchedTodos = JSON.parse(localStorage.getItem(TODO_KEY));
        if (!!fetchedTodos && !!fetchedTodos.length) {
            todos = fetchedTodos.reverse();
            setMarkup();
            document
                .querySelectorAll(".checkbox-container")
                .forEach((checkbox) => {
                    checkbox.addEventListener("click", (e) => {
                        const index = parseInt(e.target.id);
                        if (!isNaN(index)) {
                            setStatus(index);
                        }
                    });
                });
            document.querySelectorAll(".close").forEach((close) => {
                close.addEventListener("click", function (e) {
                    const index = parseInt(this.dataset.index);
                    if (!isNaN(index)) {
                        deleteTodo(index);
                    }
                });
            });
        }
    } catch (error) {}
};

const deleteTodo = (index) => {
    todos.splice(index, 1);
    localStorage.setItem(TODO_KEY, JSON.stringify(todos.reverse()));
    document.querySelector("#all-todos").innerHTML = "";
    init();
};

const setStatus = (index) => {
    todos[index].isCompleted = !todos[index].isCompleted;
    localStorage.setItem(TODO_KEY, JSON.stringify(todos.reverse()));
    document.querySelector("#all-todos").innerHTML = "";
    init();
};

const setMarkup = () => {
    let markup = "";
    todos.forEach((todo, i) => {
        const dateTime = new Date(parseInt(todo.timestamp));
        markup += `
        <div class="single-todo"  style="background: ${
            todo.isCompleted
                ? "linear-gradient(45deg, #ff417e, #ffc899)"
                : "linear-gradient(45deg, #4c2d8a, #774bcc)"
        };">
           <div class="user-todo">
                <div class="close" data-index="${i}">&#10005;</div>
                <div style="flex: 1">
                    <span style="text-decoration: ${
                        todo.isCompleted ? "line-through" : "unset"
                    };">
                        ${todo.todo}    
                    </span>
                    <div>
                    ${dateTime.toLocaleString()}
                </div>
            </div>
           </div>
            <label for="${i}" class="checkbox-container">
                <input type="checkbox" name="todo-status" id="${i}" 
                ${todo.isCompleted ? "checked" : ""} />
                <div class="checkmark"></div>
            </label>
        </div>`;
    });
    document.querySelector("#all-todos").innerHTML = markup;
};

document.querySelector("#todo-form").addEventListener("submit", (e) => {
    e.preventDefault();
    if (
        !!document.querySelector("#todo").value &&
        !/^\s+$/gim.test(document.querySelector("#todo").value)
    ) {
        const todo = {
            todo: document.querySelector("#todo").value,
            timestamp: Date.now(),
            isCompleted: false,
        };
        const fetchedTodos = localStorage.getItem(TODO_KEY);
        const todos = !!fetchedTodos ? JSON.parse(fetchedTodos) : [];
        todos.push(todo);
        localStorage.setItem(TODO_KEY, JSON.stringify(todos));
        document.querySelector("#todo").value = "";
        init();
    }
});

init();
