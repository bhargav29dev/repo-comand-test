import { useState } from "react";

const TodoApp = () => {
  const [inputValue, setInputValue] = useState("");
  const [todo, setTodo] = useState([]);

  const addTodo = (e) => {
    e.preventDefault();

    if (!inputValue.trim()) return;

    const newObj = {
      id: Date.now(),
      todoVal: inputValue,
      isCompleted: false,
      isEdditng: false,
    };
    setTodo((prev) => [...prev, newObj]);
  };

  const upDateTodo = (id, newValue) => {
    setTodo((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, todoVal: newValue } : item;
      }),
    );
  };

  const toggleTodo = (id) => {
    setTodo((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, isCompleted: true } : item;
      }),
    );
  };

  const todoEdding = (id) => {
    setTodo((prev) =>
      prev.map((item) => {
        return item.id === id ? { ...item, isEdditng: !item.isEdditng } : item;
      }),
    );
  };

  const todoDelte = (id) => {
    setTodo((prev) =>
      prev.filter((item) => {
        return item.id !== id;
      }),
    );
  };

  return (
    <>
      <form onSubmit={addTodo}>
        <input
          name="todovalue"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
        />
        <button type="submit"> Add Todo </button>
      </form>

      {todo.length === 0 ? (
        <div> No Data </div>
      ) : (
        <table border="1">
          <thead>
            <tr>
              <th> Item Name : </th>
              <th> Item status : </th>
              <th> Action: </th>
            </tr>
          </thead>

          <tbody>
            {todo.map((item) => {
              return (
                <tr>
                  <td>
                    {item.isEdditng ? (
                      <input
                        value={item.todoVal}
                        onChange={(e) => upDateTodo(item.id, e.target.value)}
                      />
                    ) : (
                      <span
                        style={{
                          textDecoration: item.isCompleted
                            ? "line-through"
                            : "none",
                        }}
                      >
                        {" "}
                        {item.todoVal}{" "}
                      </span>
                    )}
                  </td>
                  <td>
                    <button onClick={() => toggleTodo(item.id)}>
                      {item.isCompleted ? " Completed" : "Completed"}
                    </button>
                  </td>
                  <td>
                    <button onClick={() => todoEdding(item.id)}>
                      {item.isEdditng ? "Save" : "Edit"}
                    </button>
                    <button onClick={() => todoDelte(item.id)}>Delte</button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </>
  );
};

export default TodoApp;
