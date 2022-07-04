import { useState } from "react";
import Todo from "./Todo";

const List = ({ list, deleteList }) => {
  const [MonId, setId] = useState(0);
  const [Todos, setTodo] = useState([]);
  const [Values, setValues] = useState("");
  //Permet la modification de du titre de la list
  const [Modif, setModif] = useState(false);
  const [NewVal, setNewVal] = useState("");

  //Permet d'ajouter les objet dans le tableau
  const add = () => {
    setTodo((prevState) => [
      ...prevState,
      {
        id: MonId,
        title: Values === "" ? "todo " + MonId : Values,
        color: randColor()
      }
    ]);
    setValues("");
    setId(MonId + 1);
  };

  //permet de récuptérer la valeur de l'input
  const onChange = (e) => {
    setValues(e.target.value);
  };

  //permet de récupérer la valeur de l'input du changement de titre
  const onChanged = (e) => {
    setNewVal(e.target.value);
  };

  //permet de Modifier le titre de la list en appuyant sur la touche entrée
  const ModifValue = (e) => {
    if (e.keyCode || e.which === 13) {
      list.title = NewVal !== "" ? NewVal : list.title;
      setNewVal("");
      setModif(!Modif);
    }
  };

  //permet de générer une couleur aléatoir en format rgb
  const randColor = () => {
    const rou = 150;
    const blu = Math.floor(Math.random() * 255);
    const vir = 150;
    const colora = "rgb(" + rou + "," + blu + "," + vir + ")";
    return colora;
  };

  //permet la même action que le bouton ajouter en quand on appuit sur la touche entrée
  const PressEnter = (e) => {
    if (e.keyCode || e.which === 13) {
      add();
    }
  };

  //permet de supprimer le todo créer
  const deleteTodo = (id) => {
    const removeTodo = Todos.filter((todo) => {
      return todo.id !== id;
    });
    setTodo(removeTodo);
  };

  return (
    <>
      {/* en double cliquant sur le titre on a la possibilité de le changer */}
      <h2
        onDoubleClick={() => setModif(!Modif)}
        style={{ display: Modif ? "none" : "block" }}
      >
        {list.title}
      </h2>
      <input
        type="text"
        value={NewVal}
        onChange={onChanged}
        style={{ display: Modif ? "block" : "none" }}
        onKeyPress={ModifValue}
      />
      <input
        type="text"
        value={Values}
        onChange={onChange}
        onKeyPress={PressEnter}
      />
      <button onClick={add}>ajouter un todo</button>
      <button onClick={deleteList}>supprimer la List</button>
      {Todos.map((todo) => {
        return (
          <div
            key={todo.id}
            style={{
              backgroundColor: todo.color,
              borderRadius: "25px",
              padding: "25px",
              marginTop: "25px",
              width: "200px",
              boxShadow: "5px 5px 5px"
            }}
          >
            <Todo todo={todo} deleteTodo={() => deleteTodo(todo.id)} />
          </div>
        );
      })}
    </>
  );
};

export default List;
