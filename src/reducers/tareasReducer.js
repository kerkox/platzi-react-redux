import {
  TRAER_TODAS,
  CARGANDO,
  ERROR,
  CAMBIO_USER_ID,
  AGREGADA,
} from "../types/tareasTypes";

const INITIAL_STATE = {
  tareas: {},
  cargando: false,
  error: "",
  tarea: {
    userId: "",
    title: "",
  },
  regresar: false,
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case TRAER_TODAS:
      return {
        ...state,
        tareas: action.payload,
        cargando: false,
        error: "",
        regresar: false,
      };
    case CAMBIO_USER_ID:
      const { tarea } = INITIAL_STATE;
      const { name, value } = action.payload.target;
      tarea[name] = value;
      return { ...state, tarea: { ...tarea }, cargando: false, error: "" };
    case AGREGADA:
      const _tarea = {
        userId: "",
        title: "",
      };
      return {
        ...state,
        tareas: {},
        tarea: _tarea,
        cargando: false,
        error: "",
        regresar: true,
      };
    case CARGANDO:
      return { ...state, cargando: true };
    case ERROR:
      return { ...state, error: action.payload, cargando: false };
    default:
      return state;
  }
};
