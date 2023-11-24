async function saveTodo() {
    const ToDolist = document.getElementById('Todolist').value;
    if (ToDolist) {
        saveUserLocally(ToDolist); // Pass ToDolist to saveUserLocally

        const payload = {
            List: ToDolist,
            // add any other data you want
        };

        try {
            await SendtoServer(payload);
            renderTodoList();
        } catch (error) {
            console.error('Error while saving todo:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchTodoFromServer();
});


function saveUserLocally(ToDolist) {
    // Get existing todo from local storage or initialize as an empty array
    const list_todo = JSON.parse(localStorage.getItem('Todo')) || [];

    // Add the new todo to the array
    list_todo.push(ToDolist);
    
    // Save the updated list array back to local storage
    localStorage.setItem('Todo', JSON.stringify(list_todo));
}


function renderTodoList() {
    const userListElement = document.getElementById('List');
    userListElement.innerHTML = '';

    // Get todo from local storage
    const Todo = JSON.parse(localStorage.getItem('Todo')) || [];

    // Render each todo as a list item
    Todo.forEach(todo => {
        const markup = `<li>${todo}</li>`;
        userListElement.insertAdjacentHTML('beforeend', markup);
    });
}

const fetchTodoFromServer = async() => {
    try{
        const res = await fetch('https://dummyjson.com/todos/1');
        const data = await res.json();

        if (res.ok) {
            console.log('Data recieved from the server successfully');
            renderTodoList();
        } else {
            console.error('Failed to recieved data from the server');
        }
    } catch (error) {
        console.error('Error data arrived from the server', error);
    }
}


const SendtoServer = async (payload) => {
    try {
        const res = await fetch('https://dummyjson.com/todos/add', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });
        const data = await res.json();

        if (res.ok) {
            console.log('Data sent to server successfully');
        } else {
            console.error('Failed to send data to server');
        }
    } catch (error) {
        console.error('Error data not sent to server', error);
    }
};



