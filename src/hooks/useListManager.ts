import { useReducer } from "react";

const useListManager = () => {
  type stateProps = {
    fullList: string[];
    filteredList: string[];
  };

  const initialState: stateProps = { filteredList: [], fullList: [] };

  function reducer(
    state: stateProps,
    action: {
      payload: string;
      type: "ADD_ITEM" | "REMOVE_ITEM" | "FILTER_ITEM" | "RESET";
    }
  ) {
    switch (action.type) {
      case "ADD_ITEM":
        return { ...state, fullList: [...state.fullList, action.payload] };
      case "REMOVE_ITEM":
        return {
          filteredList: state.filteredList.filter(
            (item) => item !== action.payload
          ),
          fullList: state.fullList.filter(
            (item) => item !== action.payload
          ),
        };
      case "FILTER_ITEM": {
        return {
          ...state,
          filteredList: state.fullList.filter((item) =>
            item.toLowerCase().includes(action.payload.toLowerCase())
          ),
        };
      }
      case "RESET":
        return initialState;
      default:
        throw new Error(`Tipo de acción desconocida: ${action.type}`);
    }
  }

  const [state, dispatch] = useReducer(reducer, initialState);

  return {
    state,
    dispatch,
  };
};

export default useListManager;
