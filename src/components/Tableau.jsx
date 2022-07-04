import { useState } from "react";
import ListComponents from "./ListComponents";

const Tableau = () => {
  const [MonId, setId] = useState(0);
  const [Tabs, setTab] = useState([]);
  const [Titles, setTitle] = useState("");

  const add = () => {
    setTab((prevState) => [
      ...prevState,
      {
        id: MonId,
        title: Titles === "" ? "Tableau " + MonId : Titles,
        color: randColor()
      }
    ]);
    setTitle("");
    setId(MonId + 1);
  };

  const OnChange = (e) => {
    setTitle(e.target.value);
  };

  const randColor = () => {
    const rou = Math.floor(Math.random() * 255);
    const blu = Math.floor(Math.random() * 255);
    const vir = Math.floor(Math.random() * 255);
    const colora = "rgb(" + rou + "," + blu + "," + vir + ")";
    console.log(colora);
    return colora;
  };

  //permet de supprimer le tableau créer
  const deleteTab = (id) => {
    const removeList = Tabs.filter((tab) => {
      return tab.id !== id;
    });
    setTab(removeList);
  };

  const PressEnter = (e) => {
    if (e.keyCode || e.which === 13) {
      add();
    }
  };

  return (
    <>
      <div>
        <input
          type="text"
          value={Titles}
          onChange={OnChange}
          onKeyPress={PressEnter}
        />
        <button onClick={add}>ajouter groupe</button>
      </div>
      {Tabs.map((listgroup) => {
        return (
          <div
            key={listgroup.id}
            style={{
              backgroundColor: listgroup.color,
              borderRadius: "25px",
              padding: "25px",
              margin: "25px",
              display: "inline-block",
              boxShadow: "5px 5px 5px"
            }}
          >
            <ListComponents
              listGroup={listgroup}
              deleteListGroup={() => deleteTab(listgroup.id)}
            />
          </div>
        );
      })}
    </>
  );
};

export default Tableau;
