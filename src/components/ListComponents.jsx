import { useState } from "react";
import List from "./List";

const ListComponents = ({ listGroup, deleteListGroup }) => {
  const [MonId, setId] = useState(0);
  const [Lists, setList] = useState([]);
  const [Titles, setTitle] = useState("");
  //Permet la modification de du titre de la list
  const [Modif, setModif] = useState(false);
  const [NewVal, setNewVal] = useState("");

  const add = () => {
    setList((prevState) => [
      ...prevState,
      {
        id: MonId,
        title: Titles === "" ? "list " + MonId : Titles,
        color: randColor()
      }
    ]);
    setTitle("");
    setId(MonId + 1);
  };

  const randColor = () => {
    const rou = Math.floor(Math.random() * 255);
    const blu = Math.floor(Math.random() * 255);
    const vir = Math.floor(Math.random() * 255);
    const colora = "rgb(" + rou + "," + blu + "," + vir + ")";
    return colora;
  };

  const OnChange = (e) => {
    setTitle(e.target.value);
  };

  //permet de récupérer la valeur de l'input du changement de titre
  const onChanged = (e) => {
    setNewVal(e.target.value);
  };

  //permet de Modifier le titre de la list en appuyant sur la touche entrée
  const ModifValue = (e) => {
    if (e.keyCode || e.which === 13) {
      listGroup.title = NewVal !== "" ? NewVal : listGroup.title;
      setNewVal("");
      setModif(!Modif);
    }
  };

  const deleteList = (id) => {
    const removeList = Lists.filter((list) => {
      return list.id !== id;
    });
    setList(removeList);
  };

  const PressEnter = (e) => {
    if (e.keyCode || e.which === 13) {
      add();
    }
  };

  return (
    <>
      <h1
        onDoubleClick={() => setModif(!Modif)}
        style={{ display: Modif ? "none" : "block" }}
      >
        {listGroup.title}
      </h1>
      <input
        type="text"
        value={NewVal}
        onChange={onChanged}
        style={{ display: Modif ? "inline" : "none" }}
        onKeyPress={ModifValue}
      />
      <div>
        <input
          type="text"
          value={Titles}
          onChange={OnChange}
          onKeyPress={PressEnter}
        />
        <button onClick={add}>ajouter une list</button>
        <button onClick={deleteListGroup}>supprimer Tableau</button>
      </div>
      {Lists.map((list) => {
        return (
          <div
            key={list.id}
            style={{
              backgroundColor: list.color,
              borderRadius: "25px",
              padding: "25px",
              margin: "25px",
              width: "250px",
              display: "inline-block",
              boxShadow: "5px 5px 5px"
            }}
          >
            <List list={list} deleteList={() => deleteList(list.id)} />
          </div>
        );
      })}
    </>
  );
};
export default ListComponents;
