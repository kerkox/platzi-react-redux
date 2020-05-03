import axios from "axios";
import { TRAER_TODAS, CARGANDO, ERROR } from "../types/tareasTypes";
export const traerTodos = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: true,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    dispatch({
      type: TRAER_TODAS,
      payload: respuesta.data,
    });
  } catch (error) {
    console.error("Error", error.message);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};
