// Get references to relevant DOM elements
const form = document.getElementById("form") // The form element
const input = document.getElementById("input") // The input field for new todos
const todosUL = document.getElementById("todos") // The unordered list for todos

// Load existing todos from localStorage
const todos = JSON.parse(localStorage.getItem("todos"))

// If there are existing todos, add each of them to the list
if (todos) {
  todos.forEach((todo) => addTodo(todo))
}

// Listen for the form's submit event
form.addEventListener("submit", (e) => {
  e.preventDefault()

  // Call the function to add the new todo
  addTodo()
})

// Function to add a new todo
function addTodo(todo) {
  let todoText = input.value

  // If adding a pre-existing todo, use its text
  if (todo) {
    todoText = todo.text
  }

  // Check if there's text to create a todo
  if (todoText) {
    const todoEl = document.createElement("li") // Create a new list item

    // If the todo is completed, add a 'completed' class
    if (todo && todo.completed) {
      todoEl.classList.add("completed")
    }

    todoEl.innerText = todoText // Set the todo's text content

    // Toggle completion status on click and update localStorage
    todoEl.addEventListener("click", () => {
      todoEl.classList.toggle("completed")
      updateLS()
    })

    // Remove the todo on right-click (contextmenu) and update localStorage
    todoEl.addEventListener("contextmenu", (e) => {
      e.preventDefault()

      todoEl.remove()
      updateLS()
    })

    // Insert new todo at the beginning of the list if there are other todos
    if (todosUL.firstChild) {
      todosUL.insertBefore(todoEl, todosUL.firstChild)
    } else {
      // If list is empty, append the new todo
      todosUL.appendChild(todoEl)
    }

    input.value = "" // Clear the input field

    updateLS() // Update localStorage
  }
}

// Function to update localStorage with current todos
function updateLS() {
  todosEl = document.querySelectorAll("li")

  const todos = []

  // Loop through each todo element and create an object for it
  todosEl.forEach((todoEl) => {
    todos.push({
      text: todoEl.innerText,
      completed: todoEl.classList.contains("completed"),
    })
  })

  // Move completed tasks to the end of the array, maintaining order
  todos.sort((a, b) => {
    if (a.completed !== b.completed) {
      return a.completed ? -1 : 1
    } else {
      return a.text < b.text ? -1 : 1
    }
  })

  // Store the updated todos in localStorage
  localStorage.setItem("todos", JSON.stringify(todos))
}
