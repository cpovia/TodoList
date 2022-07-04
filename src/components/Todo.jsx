import { useState } from "react";

const Todo = ({ todo, deleteTodo }) => {
  const [Done, setDone] = useState(false);
  const [Modif, setModif] = useState(false);
  const [NewVal, setNewVal] = useState("");

  const onChanged = (e) => {
    setNewVal(e.target.value);
  };

  const ModifValue = (e) => {
    if (e.keyCode || e.which === 13) {
      todo.title = NewVal !== "" ? NewVal : todo.title;
      setNewVal("");
      setModif(!Modif);
    }
  };

  return (
    <>
      <input type="checkbox" onChange={() => setDone(!Done)} />
      <p
        onDoubleClick={() => setModif(!Modif)}
        style={{
          textDecoration: Done ? "line-through" : "none",
          display: Modif ? "none" : "inline"
        }}
      >
        {todo.title}
      </p>
      <input
        type="text"
        value={NewVal}
        onChange={onChanged}
        style={{ display: Modif ? "inline" : "none" }}
        onKeyPress={ModifValue}
      />
      <button onClick={deleteTodo}>supprimer la todo</button>
    </>
  );
};
export default Todo;
