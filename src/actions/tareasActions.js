import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USER_ID,
} from "../types/tareasTypes";
export const traerTodas = () => async (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: true,
  });
  try {
    const respuesta = await axios.get(
      "https://jsonplaceholder.typicode.com/todos"
    );

    const tareas = {};
    respuesta.data.map((tar) => {
      return tareas[tar.userId] = {
        ...tareas[tar.userId],
        [tar.id]: {
          ...tar
        }
      }
    });

    dispatch({
      type: TRAER_TODAS,
      payload: tareas,
    });
  } catch (error) {
    console.error("Error", error.message);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const cambioUsuarioId = (target) => (dispatch) => {
  dispatch({
    type:CAMBIO_USER_ID,
    payload: target
  })
}
