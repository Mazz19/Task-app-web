// Seleziona elementi del DOM
const taskInput = document.getElementById("new-task-input");
const addTaskButton = document.getElementById("add-task-button");
const taskList = document.getElementById("task-list");

// Funzione per aggiungere un'attività
function addTask() {
    const taskText = taskInput.value.trim();
    if (taskText === "") return;

    const taskItem = document.createElement("li");

    // Testo dell'attività
    const taskTextElement = document.createElement("span");
    taskTextElement.textContent = taskText;
    taskItem.appendChild(taskTextElement);

    // Bottone per completare l'attività
    const completeButton = document.createElement("button");
    completeButton.textContent = "✔️";
    completeButton.addEventListener("click", () => {
        taskTextElement.classList.toggle("completed");
    });
    taskItem.appendChild(completeButton);

    // Bottone per eliminare l'attività
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "❌";
    deleteButton.addEventListener("click", () => {
        taskList.removeChild(taskItem);
    });
    taskItem.appendChild(deleteButton);

    // Aggiungi l'attività alla lista
    taskList.appendChild(taskItem);

    // Pulisci il campo di input
    taskInput.value = "";
}

// Aggiungi un evento al bottone "Aggiungi"
addTaskButton.addEventListener("click", addTask);

// Permetti di premere Enter per aggiungere attività
taskInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") addTask();
});