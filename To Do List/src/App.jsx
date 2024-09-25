import { useState, useEffect } from "react";
import Nav_1 from "./components/Nav_1.jsx";
import "./App.css";

function App() {
  const [todo, settodo] = useState("");
  const [todos, settodos] = useState([]);
  useEffect(() => {
    let todostring = localStorage.getItem("todos");
    if (todostring) {
      let todos = JSON.parse(localStorage.getItem("todos"));
      settodos(todos);
    }
  }, []);
  let id, colour;

  function change(e) {
    let div = document.getElementById(e);
    div.classList.toggle("hook");
  }

  const HandleChange = (e) => {
    settodo(e.target.value);
  };
  const HandleAdd = (e) => {
    settodos([...todos, { todo, check: false }]);
    settodo("");
  };

  function HandleDelet(e) {
    let toremove = todos[e];
    confirm(`Do you want to delete the task of ${toremove.todo}`);
    let newtodos = todos.filter((items) => items !== toremove);
    settodos(newtodos);
  }

  function HandleEdit(e) {
    let toedit = todos[e];
    settodo(toedit.todo);
    let newtodos = todos.filter((items) => items !== toedit);
    settodos(newtodos);
  }

  const savetoloc = (params) => {
    localStorage.setItem("todos", JSON.stringify(todos));
  };

  return (
    <>
      <div className="h-screen w-full bg-cyan-800 relative">
        <Nav_1 />
        <div className="BACKGROUND m-auto flex flex-col justify-around bg-cyan-950 mt-12 w-4/5 h-3/4 rounded-xl p-2">
          <div className="info w-4/5 mx-auto h-1/6 flex justify-evenly items-center ">
            <input
              type="text"
              onChange={HandleChange}
              placeholder="Add Your Task"
              value={todo}
              name="textbox"
              className="VALUE text-center"
            />
            <div className="btn">
              <button
                onClick={HandleAdd}
                className="h-8 w-16 rounded-lg font-medium text-center m-2 p-1 active:bg-cyan-500 bg-cyan-400"
              >
                ADD
              </button>
              <button
                onClick={() => savetoloc()}
                className="h-8 w-16 rounded-lg font-medium text-center m-2 p-1 active:bg-cyan-500 bg-cyan-400"
              >
                SAVE
              </button>
            </div>
          </div>
          <div className="list  overflow-x-hidden flex flex-col items-center justify-start w-full mx-auto h-4/6">
            {todos.length == 0 && (
              <h3 className="text-white text-center font-semibold">
                No TODO's to display
              </h3>
            )}
            {todos.map((item) => {
              id = todos.indexOf(item);
              return (
                <div
                  key={id}
                  className="item w-4/5 m-1 p-1 flex items-center justify-between text-white "
                >
                  <div id={todos.indexOf(item)} className="change text-xl">
                    {item.todo}
                  </div>
                  <div className=" text-black flex justify-around items-center ">
                    <input
                      type="checkbox"
                      onChange={() => {
                        let value = !item.check;
                        item.check = value;
                        change(todos.indexOf(item));
                      }}
                    />
                    <button
                      onClick={() => HandleEdit(todos.indexOf(item))}
                      className="h-8 w-16 rounded-lg font-medium text-center m-2 p-1 active:bg-cyan-500 bg-cyan-400"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => HandleDelet(todos.indexOf(item))}
                      className="h-8 w-16 rounded-lg font-medium text-center m-2 p-1 active:bg-cyan-500 bg-cyan-400"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
