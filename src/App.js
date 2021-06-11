import React from "react";
import './App.css';

function App() {
  const [todos, setTodos] = React.useState([])
  const [todo, setTodo ] = React.useState("")
  
  const [todoEditing, setTodoEditing] = React.useState(null)
  const [editingText, setEditingText] = React.useState("")

  React.useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)
    
    if (loadedTodos) {
      setTodos(loadedTodos)
    }
  }, [])

  React.useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos", temp)
  }, [todos])


  function handleSubmit(e){
    e.preventDefault()

    const newTodo = {
      id : 1 + Math.random(),
      text: todo,
      completed: false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo("")
  }

  function deleteTodo(id){
    const updatedTodos = [...todos].filter( (todo) => todo.id !== id)

    setTodos(updatedTodos)
  }

  function toggleComplete(id){
    const updatedTodos = [...todos].map( (todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo
    })
    setTodos(updatedTodos)
  }

  function editTodo(id) {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })

    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
  }

  return (
    <div className="App">
     <form onSubmit={
       handleSubmit
     }
     >
      <input
        id="addTask" 
        type="text"
        onChange={(e) => setTodo(e.target.value)}
        value = {todo}  
        />
      <button type="submit" className="waves-effect waves-ligh btn">Add Todo</button> 
     </form>
     {todos.map(
       (todo) => 
       <div key={todo.id}> 
        {todoEditing === todo.id ? (<input id="addTask" type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText} /> ) : ( <div>{todo.text}</div> )}  
        <label><input type="checkbox" onChange={() => toggleComplete(todo.id)} checked={todo.completed} /> <span></span> </label>
        {todoEditing === todo.id ? ( <button className="waves-effect waves-ligh btn" onClick={() => editTodo(todo.id) } >Submit Edit</button>) : (<button className="waves-effect waves-ligh btn" onClick= {() => setTodoEditing(todo.id) }>Edit</button>) }
        <button className="waves-effect waves-ligh btn" onClick= {() => deleteTodo(todo.id) }>Delete</button>
       </div>
     )}
    </div>
  );
}

export default App;
