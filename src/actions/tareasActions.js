import axios from "axios";
import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USER_ID,
  GUARDADA,
  ACTUALIZAR,
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
      return (tareas[tar.userId] = {
        ...tareas[tar.userId],
        [tar.id]: {
          ...tar,
        },
      });
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

export const cambioFormTareas = (target) => (dispatch) => {
  dispatch({
    type: CAMBIO_USER_ID,
    payload: target,
  });
};

export const agregar = (nueva_tarea) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: true,
  });
  try {
    const respuesta = await axios.post(
      "https://jsonplaceholder.typicode.com/todos",
      nueva_tarea
    );
    console.log(respuesta.data);
    dispatch({
      type: GUARDADA
    })
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const editar = (tarea_editada) => async (dispatch) => {
  dispatch({
    type: CARGANDO,
    payload: true,
  });
  try {
    const respuesta = await axios.put(
      `https://jsonplaceholder.typicode.com/todos/${tarea_editada.id}`,
      tarea_editada
    );
    console.log(respuesta.data);
    dispatch({
      type: GUARDADA,
    });
  } catch (error) {
    console.error(error.message);
    dispatch({
      type: ERROR,
      payload: error.message,
    });
  }
};

export const cambioCheck = (user_id,tarea_id) => async (dispatch, getState) => {
    
    dispatch({
      type: CARGANDO,
      payload: true,
    });

    const { tareas } = getState().tareasReducer;
    const seleccionada = tareas[user_id][tarea_id];

    const actualizadas = {
      ...tareas
    };
    actualizadas[user_id][tarea_id] = {
      ...tareas[user_id][tarea_id],
      completed: !seleccionada.completed
    }

      dispatch({
        type: ACTUALIZAR,
        payload: actualizadas
      });

}