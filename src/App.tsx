import { useCallback, useEffect, useState } from "react";
import "@/App.css";

import Card from "@components/Card";
import Button from "@components/Button";
import { INPUT_MINIMUM_CHARACTERS } from "@/constants";
import useListManager from "@/hooks/useListManager";
import useDebounce from "@/hooks/useDebounce";
import InputWithValidation from "./components/InputWithValidation";

function App() {
  const [inputPhrase, setInputPhrase] = useState("");
  const [inputSearch, setInputSearch] = useState("");

  const { state, dispatch } = useListManager();

  const debouncedSearchTerm = useDebounce(inputSearch, 1500);

  const SEARCH_IS_ACTIVE =
    debouncedSearchTerm.length >= INPUT_MINIMUM_CHARACTERS;

  useEffect(() => {
    if (debouncedSearchTerm)
      if (SEARCH_IS_ACTIVE)
        dispatch({ type: "FILTER_ITEM", payload: debouncedSearchTerm });
  }, [SEARCH_IS_ACTIVE, debouncedSearchTerm, dispatch]);

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
        <InputWithValidation
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
        <InputWithValidation
          label="Buscar frase"
          onChange={(e) => setInputSearch(e.target.value)}
          type="search"
          value={inputSearch}
        />
      </div>
      {/*-------------------*/}

      {/*CONDITIONAL RENDERING SECTION: SHOWS EMPTY MESSAGE, FULL LIST OR FILTERED LIST*/}
      {SEARCH_IS_ACTIVE && state.filteredList.length === 0 && (
        <h1>No se encontraron coincidencias</h1>
      )}
      <div className="grow">
        <div className="grid grid-cols-1 md:grid-cols-3 xl:grid-cols-5 gap-4 py-4">
          {SEARCH_IS_ACTIVE &&
            state.filteredList.length > 0 &&
            state.filteredList.map((phrase, index) => (
              <Card key={`${phrase}-${index}`} onDelete={remove}>
                {phrase}
              </Card>
            ))}

          {!SEARCH_IS_ACTIVE &&
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
