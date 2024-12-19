import { useState,useEffect } from "react"
import './TodoApp.css'

function TodoApp() {
    const [Todos, SetTodos] = useState(getInitialTodos());
    const [Todo, setTodo] = useState('')
    const [Edit, setEdit] = useState(false)
  const [Index, setIndex] = useState()
  const [isComplete,setIscomplete] = useState(false)

    function addTodo() {
        if (Todo.trim()){
            SetTodos([...Todos, {value:Todo,status:false}]);
        }
        setTodo("")
    }

    function setingTodo(e) {
        setTodo(e.target.value);
        
    }
    function deleteTodo(index) {
        alert("are You Suer to delete")
        SetTodos(Todos.filter((item,i)=> i!==index))
    }
    function editTodo(index) {
        setEdit(true)
        setTodo(Todos[index].value);
        setIndex(index)
       
    }
    function editThatTodo() {
        SetTodos(Todos.map((item,i) => {
            if (i == Index) {
              return {...item,value:Todo};
            }
            return item;
        }));
        setEdit("")
        setIndex("")
        setTodo("")
    }
function handleIsTodo(e, index) {
  const checked = e.target.checked; 
  SetTodos(
    Todos.map((item, i) => {
      if (i === index) {
        return { ...item, status: checked }; 
      }
      return item;
    })
  );

  }
  function handleComplet(){
    setIscomplete((e) => e == false ? true : false)
    const table = document.getElementById("todotable");
    const head1 = document.getElementById("compledHed");
   isComplete
     ? ((table.style.visibility = "visible"), (head1.style.display = "none"))
     : ((table.style.visibility = "hidden"), (head1.style.display = "block"));


  }

  useEffect(() => {
    const temp = JSON.stringify(Todos)
    localStorage.setItem("Todos",temp)
  }, [Todos])
  function getInitialTodos() {
    const temp = localStorage.getItem("Todos")
    const saveTodos = JSON.parse(temp)
    return saveTodos || []
  }
    return (
      <div className="todo-container">
        <h1 className="heading-todo">ActionPlan</h1>
        <div className="container">
          <div className="container__item">
            <form className="form" onSubmit={(e) => e.preventDefault()}>
              <input
                id="TodoItem"
                className="form__field"
                type="text"
                value={Todo}
                onChange={(e) => setingTodo(e)}
                placeholder="Enter Your Todo Item"
              />
              {!Edit ? (
                <button
                  type="button"
                  className="btn btn--primary btn--inside uppercase"
                  onClick={addTodo}
                >
                  Add
                </button>
              ) : (
                <button
                  type="button"
                  className="btn btn--primary btn--inside uppercase"
                  onClick={editThatTodo}
                >
                  Edit
                </button>
              )}
            </form>
          </div>
        </div>
        <h3 id="compledHed" style={{display:"none"}}> Completed Tasks </h3>
        <table>
          {Todos.length > 0 ? (
            <thead id="todotable">
              <tr>
                <th>Status</th>
                <th>Todo Item</th>
                <th>Actions</th>
              </tr>
            </thead>
          ) : null}
          <tbody>
            {isComplete === false
              ? Todos.sort((a, b) => b.status - a.status).map((item, index) => (
                  <tr key={index} className="AllListItem">
                    <td>
                      <div className="checkbox-wrapper-31">
                        <input
                          id="checkbox-31"
                          checked={item.status}
                          onClick={(e) => handleIsTodo(e, index)}
                          type="checkbox"
                        />
                        <svg width="25px" height="25px" viewBox="0 0 40 40">
                          <circle
                            className="background"
                            cx="20"
                            cy="20"
                            r="18"
                          ></circle>
                          <circle
                            className="stroke"
                            cx="20"
                            cy="20"
                            r="16"
                          ></circle>
                          <path
                            className="check"
                            d="M 13,21 L 17,27 L 31,15"
                          ></path>
                        </svg>
                      </div>
                    </td>
                    <td>
                      <span className="items">{item.value}</span>
                    </td>
                    <td>
                      <button
                        onClick={() => deleteTodo(index)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                      <button
                        onClick={() => editTodo(index)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))
              : Todos.map((item, i) => {
                  if (item.status) {
                    return (
                      <tr key={i}>
                        <td colSpan="3">
                          <p>{item.value}</p>
                        </td>
                      </tr>
                    );
                  }
                  return null;
                })}
          </tbody>
        </table>

        {Todos.length > 0 && isComplete == false ? (
          <button className="completedTasks" onClick={handleComplet}>
            {" "}
            view completed tasks
          </button>
        ) : (
          <button
            className="completedTasks"
            style={
              isComplete == false ? { display: "none" } : { display: "block" }
            }
            onClick={handleComplet}
          >
            Back
          </button>
        )}
      </div>
    );
}

export default TodoApp