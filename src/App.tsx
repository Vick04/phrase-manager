import { useCallback, useEffect, useState } from "react";
import "@/App.css";
import { TextField } from "@mui/material";

import Card from "@components/Card";
import Button from "@components/Button";
import useListManager from "./hooks/useListManager";

function App() {
  const [inputPhrase, setInputPhrase] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const { state, dispatch } = useListManager();

  useEffect(() => {
    dispatch({ type: "FILTER_ITEM", payload: inputSearch });
  }, [dispatch, inputSearch]);

  const add = () => {
    dispatch({ type: "ADD_ITEM", payload: inputPhrase });
    setInputPhrase("");
  };

  const remove = useCallback(
    (phrase: string) => {
      dispatch({ type: "REMOVE_ITEM", payload: phrase });
    },
    [dispatch]
  );

  return (
    <div className="flex flex-col gap-y-4 h-full">
      <div>
        <p className="font-bold text-3xl">Administrador de frases</p>
      </div>

      {/*ADD PHRASE INPUT + BUTTON*/}
      <div className="grid grid-cols-4 gap-3 grow-0">
        <TextField
          label="Escribir frase"
          onChange={(e) => setInputPhrase(e.target.value)}
          value={inputPhrase}
        />
        <Button disabled={inputPhrase.length === 0} onClick={add}>
          Agregar frase
        </Button>
      </div>
      {/*-------------------*/}

      {/*SEARCH PHRASE INPUT*/}
      <div className="grid gap-3 grow-0">
        <TextField
          label="Buscar frase"
          onChange={(e) => setInputSearch(e.target.value)}
          type="search"
          value={inputSearch}
        />
      </div>
      {/*-------------------*/}

      {/*CONDITIONAL RENDERING SECTION: SHOWS EMPTY MESSAGE, FULL LIST OR FILTERED LIST*/}
      {inputSearch.length !== 0 && state.filteredList.length === 0 && (
        <h1>No se encontraron coincidencias</h1>
      )}
      <div className="grow">
        <div className="grid gap-4 py-4">
          {inputSearch.length !== 0 &&
            state.filteredList.length > 0 &&
            state.filteredList.map((phrase, index) => (
              <Card key={`${phrase}-${index}`} onDelete={remove}>
                {phrase}
              </Card>
            ))}

          {inputSearch.length === 0 &&
            state.fullList.map((phrase, index) => (
              <Card key={`${phrase}-${index}`} onDelete={remove}>
                {phrase}
              </Card>
            ))}
        </div>
      </div>
      {/* ------------------------------------------------------------------------------ */}
    </div>
  );
}

export default App;
