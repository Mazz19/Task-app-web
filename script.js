// Configurazione di Firebase
const firebaseConfig = {
    apiKey: "AIzaSyAQBMtln8aJp48U3McYar0e5PqvMlKJt24",
    authDomain: "to-do-list-73cf2.firebaseapp.com",
    projectId: "to-do-list-73cf2",
    storageBucket: "to-do-list-73cf2.appspot.com",
    messagingSenderId: "49436756077",
    appId: "1:49436756077:web:3dcdd3ef379a70dba25764"
};

// Inizializza Firebase
const app = firebase.initializeApp(firebaseConfig);
const db = firebase.firestore();

// Carica le attività quando la pagina viene caricata
window.onload = () => {
    loadTodos();
};

// Funzione per caricare le attività
function loadTodos() {
    db.collection("todos").get().then((querySnapshot) => {
        const todoList = document.getElementById('todo-list');
        todoList.innerHTML = '';
        querySnapshot.forEach((doc) => {
            const todo = { id: doc.id, ...doc.data() };
            addTodoToDOM(todo);
        });
    });
}

// Aggiunge un'attività al database e aggiorna il DOM
function addTodo() {
    const todoInput = document.getElementById('todo-input');
    const todoText = todoInput.value.trim();
    if (todoText === '') return;

    db.collection("todos").add({
        text: todoText,
        completed: false
    }).then((docRef) => {
        addTodoToDOM({ id: docRef.id, text: todoText, completed: false });
        todoInput.value = '';
    }).catch((error) => {
        console.error("Errore durante l'aggiunta dell'attività: ", error);
    });
}

// Funzione per aggiungere un elemento al DOM
function addTodoToDOM(todo) {
    const todoList = document.getElementById('todo-list');
    const todoItem = document.createElement('li');
    todoItem.classList.add('todo-item');
    if (todo.completed) todoItem.classList.add('completed');

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodoCompletion(todo.id, checkbox.checked));

    const label = document.createElement('label');
    label.appendChild(checkbox);
    label.appendChild(document.createTextNode(todo.text));

    const deleteBtn = document.createElement('button');
    deleteBtn.classList.add('delete-btn');
    deleteBtn.textContent = 'X';
    deleteBtn.onclick = () => deleteTodo(todo.id, todoItem);

    todoItem.appendChild(label);
    todoItem.appendChild(deleteBtn);
    todoList.appendChild(todoItem);
}

// Aggiorna lo stato di completamento
function toggleTodoCompletion(id, completed) {
    db.collection("todos").doc(id).update({
        completed: completed
    }).catch((error) => {
        console.error("Errore durante l'aggiornamento dell'attività: ", error);
    });
}

// Elimina un'attività
function deleteTodo(id, todoItem) {
    db.collection("todos").doc(id).delete().then(() => {
        todoItem.remove();
    }).catch((error) => {
        console.error("Errore durante l'eliminazione dell'attività: ", error);
    });
}
