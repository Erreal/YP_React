import React, { useState } from "react";
import AppHeader from "../AppHeader/AppHeader";
import appStyles from "./App.module.css";
import BurgerIngredients from "../BurgerIngredients/BurgerIngredients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import tempBasket from "../../utils/tempBasket";

function App() {
  const [apiState, setApiState] = useState({
    loaded: false,
    data: [],
  });
  const dataUrl = "https://norma.nomoreparties.space/api/ingredients";
  React.useEffect(() => {
    fetch(dataUrl)
      .then((response) => {
        if (response.ok) {
          return response.json();
        }
        return Promise.reject(`Error ${response.status}`);
      })
      .then((data) => {
        if (data.success) {
          setApiState({
            loaded: true,
            data: data.data,
          });
        } else {
          console.error("Server failed request");
        }
      })
      .catch((error) => console.error(error));
  }, []);
  return (
    <>
      <AppHeader />(
      {apiState.loaded && (
        <main className={appStyles.container}>
          <BurgerIngredients data={apiState.data} />
          <BurgerConstructor basket={tempBasket} />
        </main>
      )}
      )
    </>
  );
}

export default App;
