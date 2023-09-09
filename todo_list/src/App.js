import React from "react";
import "./App.css";
const App = () => {
    const [todos, setTodos] = React.useState([]);
    const [todo, setTodo] = React.useState("");

    const [todoEditing, setTodoEditing]  = React.useState(null);
    const [editingText, setEditingText] = React.useState("");

    React.useEffect(
        () => {
            const json = localStorage.getItem("todos");
            const loadedTodos = JSON.parse(json);
            if (loadedTodos) {
                setTodos(loadedTodos);
            }
        }, []);

    React.useEffect(
        () => {
            if (todos.length > 0) {
                const json = JSON.stringify(todos);
                localStorage.setItem("todos", json);
            }
        }, [todos]);

    // Add the handlesubmit code here
    function handleSubmit(e) {
        /* e: This is an event object that is automatically passed to the 
        function when the form is submitted. It contains information about the event,
         including details about the form submission. */
        e.preventDefault();
        /* the default behavior is to send a request to the server, 
        which typically results in a page reload. By calling e.preventDefault();, 
        you are instructing the browser not to perform this default behavior. */

        const newTodo = {
            id: new Date().getTime(),
            text: todo.trim(),
            completed: false
        };

        if (newTodo.text.length > 0) {
            setTodos([...todos].concat(newTodo));
            setTodo("");
        } else {
            alert("Enter Valid Task");
            setTodo("");
        }


    }

    // Add the deleteToDo code here
    function deleteTodo(id) {
        let updatedTodos = [...todos].filter((todo) => todo.id !== id);
        setTodos(updatedTodos);
    }


    // Add the toggleComplete code here
    function toggleComplete(id) {
        let updatedTodos = [...todos].map( (todo) => {
            if (todo.id === id){
                todo.completed = !todo.completed;
            }
            return todo;
        });
        setTodos(updatedTodos);
    }


    // Add the submitEdits code here
    function submitEdits(id) {
        const updatedTodos = [...todos].map( (todo) => {
            if (todo.id === id) {
                todo.text = editingText;
            }
            return todo;
        });
        setTodos(updatedTodos);
        setTodoEditing(null);
    }


    return (
        <div id="todo-list">
            <h1>Todo List</h1>
            <form onSubmit={handleSubmit}>

                <input 
                    type="text"
                    onChange={(e) => setTodo(e.target.value)} 
                    placeholder="Add a new task"
                    value={todo}
                />

                <button type="submit">Add Todo</button>

            </form>

            {todos.map((todo) => 
                <div className="todo" key={todo.id}>

                    <div className="todo-text">
                        <input 
                            type="checkbox" 
                            id="completed"
                            checked={todo.completed} 
                            onChange={() => toggleComplete(todo.id)} 
                        />
                    
                        {
                            todo.id === todoEditing ?
                            (<input 
                                type="text" 
                                onChange={e => {
                                    setEditingText(e.target.value)
                                }}
                                value={editingText}
                            />) :
                            (<div>{todo.text}</div>)
                        }

                    </div>

                    <div className="todo-actions">
                        
                        {
                            todo.id === todoEditing ?
                            ( <button onClick={() => submitEdits(todo.id)}>Submit Edits</button> ) :
                            ( <button onClick={() => {
                                setTodoEditing(todo.id)
                                setEditingText(todo.text)
                            }}>Edit</button> )
                        }

                        <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                    </div>
                    
                </div>
            )}
        </div>
    );
};
export default App;
