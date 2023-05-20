
import { useState } from "react";
import "./App.css";

export default function App() {
  const [newItem, setNewItem] = useState("");
  const [todos, setTodos] = useState([]);
  const [desc, setDesc] = useState("");
  const [editingTodoId, setEditingTodoId] = useState(null);
  const [updatedTitle, setUpdatedTitle] = useState("");

  function handleSubmit(e) {
    e.preventDefault();
    if (editingTodoId) {
      // Update existing task
      setTodos((currentTodos) => {
        return currentTodos.map((todo) => {
          if (todo.id === editingTodoId) {
            return { ...todo, title: updatedTitle };
          }
          return todo;
        });
      });
      setEditingTodoId(null);
      setUpdatedTitle("");
    } else {
      // Add new task
      setTodos((currentTodos) => {
        return [
          ...currentTodos,
          { title: newItem, id: crypto.randomUUID(), completed: false, desc },
        ];
      });
      setNewItem("");
      setDesc("");
    }
  }

  function toggleTodo(id, completed) {
    setTodos((currentTodos) => {
      return currentTodos.map((todo) => {
        if (todo.id === id) {
          return { ...todo, completed };
        }
        return todo;
      });
    });
  }

  function deleteTodo(id) {
    setTodos((currentTodos) => {
      return currentTodos.filter((todo) => todo.id !== id);
    });
  }

  function editTodo(id) {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setEditingTodoId(id);
      setUpdatedTitle(todoToEdit.title);
    }
  }
  function deleteAllTodos() {
    setTodos([]);
  }

  return (
    < >
      <form className="new-item-form" onSubmit={handleSubmit}>
        <div className="form-row">
          <label htmlFor="item">{editingTodoId ? "Edit TaskName" : "Add Task"}</label>
          <input
            type="text"
            id="item"
            value={editingTodoId ? updatedTitle : newItem}
            onChange={(e) => {
              if (editingTodoId) {
                setUpdatedTitle(e.target.value);
              } else {
                setNewItem(e.target.value);
              }
            }}
          />
        </div>
        <textarea
          placeholder="Description"
          value={desc}
          onChange={(e) => {
            setDesc(e.target.value);
          }}
        ></textarea>
        <button className="btn">{editingTodoId ? "Update" : "Add"}</button>
      </form>
      <h1 className="header">Todo List</h1>
      <ul className="list">
        {todos.length === 0 && "No todos"}
        {todos.map((todo) => {
          return (
            <li key={todo.id}>
              <label>
                <input
                  type="checkbox"
                  checked={todo.completed}
                  onChange={(e) => {
                    toggleTodo(todo.id, e.target.checked);

                  }}
                />
                {editingTodoId === todo.id ? (
                  <input
                    type="text"
                    value={updatedTitle}
                    onChange={(e) => setUpdatedTitle(e.target.value)}
                  />
                ) : (
                 <p>{todo.title}</p>
                )}
              </label>
              <div className="desc"><p>{todo.desc}</p></div>
              <button
                className="btn btn-danger"
                onClick={() => deleteTodo(todo.id)}
              >
                Delete
              </button>
              {editingTodoId === todo.id ? (
                <button
                  className="btn btn-primary"
                  onClick={(e) => handleSubmit(e)}
                >
                  Save
                </button>
              ) : (
                <>
                <button
                  className="btn btn-primary"
                  onClick={() => editTodo(todo.id)}
                >
                  Edit
                </button>
                {todos.length > 0 &&  (
                  <button onClick={()=>{
                    window.alert("Are you sure you want to erase all tasks?None of your work shall be saved")
                    deleteAllTodos();
                      }} className="da">Delete all </button>
                )}


                </>

              )}
            </li>

          );
        })}
      </ul>

    </>
  );
}
