const item = document.querySelector("#item");
const toDoBox = document.querySelector("#to-do-box");

// Load saved to-dos from localStorage when the page loads
document.addEventListener("DOMContentLoaded", loadToDos);

item.addEventListener("keyup", function(event) {
    if (event.key == "Enter") {
        // Add new item to the list
        addToDo(this.value);
        this.value = "";  // Clear the input field
    }
});

const addToDo = (item) => {
    const listItem = document.createElement("li");
    listItem.innerHTML = `
    ${item}
    <i class="fas fa-times"></i>
    `;

    listItem.addEventListener("click", function() {
        this.classList.toggle("done");
        saveToLocalStorage();
    });

    listItem.querySelector("i").addEventListener("click", function() {
        listItem.remove();
        saveToLocalStorage();
    });

    toDoBox.appendChild(listItem);
    saveToLocalStorage();  // Save updated to-do list to localStorage
};

// Save to-dos to localStorage
function saveToLocalStorage() {
    const todos = [];
    const listItems = toDoBox.querySelectorAll("li");

    listItems.forEach(item => {
        todos.push({
            text: item.innerText.trim(),
            done: item.classList.contains("done")
        });
    });

    localStorage.setItem("todos", JSON.stringify(todos)); // Store todos in localStorage
}

// Load to-dos from localStorage
function loadToDos() {
    const todos = JSON.parse(localStorage.getItem("todos"));
    if (todos) {
        todos.forEach(todo => {
            const listItem = document.createElement("li");
            listItem.innerHTML = `
            ${todo.text}
            <i class="fas fa-times"></i>
            `;

            if (todo.done) {
                listItem.classList.add("done");
            }

            listItem.addEventListener("click", function() {
                this.classList.toggle("done");
                saveToLocalStorage();
            });

            listItem.querySelector("i").addEventListener("click", function() {
                listItem.remove();
                saveToLocalStorage();
            });

            toDoBox.appendChild(listItem);
        });
    }
}
