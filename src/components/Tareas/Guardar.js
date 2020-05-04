import React, { Component } from "react";
import { connect } from "react-redux";
import Spinner from "../Shared/Spinner/Spinner";
import Fatal from "../Shared/Fatal/Fatal";
import { Redirect } from "react-router-dom";

import * as tareasActions from "../../actions/tareasActions";

class Guardar extends Component {
  componentDidMount = () => {
    const {
      match: {
        params: { user_id, tarea_id },
      },
      tareas,
      cambioFormTareas,
      limpiarForma
    } = this.props;

    if ( Object.keys(tareas).length && user_id && tarea_id) {
      const tarea = tareas[user_id][tarea_id];
      const userId = { target: { name: "userId", value: tarea.userId } };
      const title = { target: { name: "title", value: tarea.title } };
      cambioFormTareas(userId);
      cambioFormTareas(title);
    } else {
      limpiarForma();
    }
  };

  handleChange = (event) => {
    event.persist();
    this.props.cambioFormTareas(event);
  };
  guardar = () => {
    const {
      match: {
        params: { user_id, tarea_id },
      },
      tareas,
      agregar,
      editar
    } = this.props;

    const nueva_tarea = {
      ...this.props.tarea,
      completed: false,
    };

    if( user_id && tarea_id ) {
      const tarea = tareas[user_id][tarea_id];
      const tarea_editada = {
        ...nueva_tarea,
        completed: tarea.completed,
        id: tarea.id
      }
      editar(tarea_editada);

    } else {
      agregar(nueva_tarea);
    }

  };

  deshabilitar = () => {
    const { tarea, cargando } = this.props;
    if (cargando) {
      return true;
    }

    if (!tarea.userId || !tarea.title) {
      return true;
    }
    return false;
  };
  mostrarAccion = () => {
    const { error, cargando } = this.props;
    if (error) {
      return <Fatal mensaje={error} />;
    }
    if (cargando) {
      return <Spinner />;
    }
  };

  render() {
    return (
      <div>
        {this.props.regresar && <Redirect to="/tareas" />}
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          name="userId"
          value={this.props.tarea.userId}
          onChange={this.handleChange}
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          name="title"
          value={this.props.tarea.title}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button onClick={this.guardar} disabled={this.deshabilitar()}>
          Guardar
        </button>
        {this.mostrarAccion()}
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
