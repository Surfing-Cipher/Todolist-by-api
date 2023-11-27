let Todos = [];
async function saveTodo() {
    const ToDolist = document.getElementById('Todolist').value;
    if (ToDolist) {
        const payload = {
            todo: ToDolist,
            // add any other data you want
        };

        try {
            console.log(payload)
            await SendtoServer(payload);
            fetchTodoFromServer(payload);
            renderTodoList(Todos, payload);
            
        } catch (error) {
            console.error('Error while saving todo:', error);
        }
    }
}

document.addEventListener('DOMContentLoaded', function() {
    fetchTodoFromServer();
});



function renderTodoList(Todos, payload) {
    const userListElement = document.getElementById('List');
    userListElement.innerHTML = '';

    Todos.push(payload);

    Todos.forEach(Todos => {
        const markup = `<li>${Todos.todo}</li>`;
        userListElement.insertAdjacentHTML('beforeend', markup);
    });
    
}

const fetchTodoFromServer = async(payload) => {
    try{
        const res = await fetch('https://dummyjson.com/todos');
        const data = await res.json();
        Todos = data.todos;
        console.log(data)
        if (res.ok) {
            console.log('Data recieved from the server successfully');
            renderTodoList(Todos, payload);
        } else {
            console.error('Failed to recieved data from the server');
        }
    } catch (error) {
        console.error('Error data arrived from the server', error);
    }
}


const SendtoServer = async (payload) => {
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
            console.log('Data sent to server successfully');
        } else {
            console.error('Failed to send data to server');
        }
    } catch (error) {
        console.error('Error data not sent to server', error);
    }
};