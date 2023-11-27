let Todos = [];
let payload = null;

async function saveTodo() {
    const ToDolist = document.getElementById('Todolist').value;
    if (ToDolist) {
        const highestId = getHighestIdFromTodos();
        const newId = highestId + 1;

        const existingItem = Todos.find(item => item && item.id === newId);
        if (existingItem) {
            console.error('Item with the same id already exists.');
            return;
        }

        payload = {
            todo: ToDolist,
            id: newId,
        };

        try {
            console.log(payload);
            await SendtoServer(payload);
            await fetchTodoFromServer();
            renderTodoList();
        } catch (error) {
            console.error('Error while saving todo:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', function () {
    fetchTodoFromServer();
});

function renderTodoList() {
    const userListElement = document.getElementById('List');
    userListElement.innerHTML = '';

    Todos.forEach(todoItem => {
        if (todoItem && todoItem.todo) {
            const markup = `<li>${todoItem.todo}</li>`;
            userListElement.insertAdjacentHTML('beforeend', markup);
        }
    });

    if (payload && !Todos.find(item => item.id === payload.id)) {
        Todos.push(payload);
    }
}

async function fetchTodoFromServer() {
    try {
        const res = await fetch('https://dummyjson.com/todos');
        const data = await res.json();
        Todos = data.todos || [];
        console.log(data);
        if (res.ok) {
            console.log('Data received from the server successfully');
            renderTodoList();
        } else {
            console.error('Failed to receive data from the server');
        }
    } catch (error) {
        console.error('Error data arrived from the server', error);
    }
}

async function SendtoServer(payload) {
    try {
        const res = await fetch('https://jsonplaceholder.typicode.com/posts', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.ok) {
            console.log('Data sent to the server successfully');
        } else {
            console.error('Failed to send data to the server');
        }
    } catch (error) {
        console.error('Error data not sent to the server', error);
    }
}

function getHighestIdFromTodos() {
    let highestId = 0;

    for (const todoItem of Todos) {
        if (todoItem && todoItem.id > highestId) {
            highestId = todoItem.id;
        }
    }

    return highestId;
}