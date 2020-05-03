import React, { Component } from "react";
import { connect } from "react-redux";
import * as tareasActions from "../../actions/tareasActions";

class Guardar extends Component {
  handleChange = (event) => {
    this.props.cambioUsuarioId(event);
  };

  render() {
    return (
      <div>
        <h1>Guardar Tarea</h1>
        Usuario id:
        <input
          type="number"
          name="usuario_id"
          value={this.props.tarea.usuario_id}
          onChange={this.handleChange}
        />
        <br />
        <br />
        Titulo:
        <input
          type="text"
          name="titulo"
          defaultValue={this.props.tarea.titulo}
          onChange={this.handleChange}
        />
        <br />
        <br />
        <button>Guardar</button>
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Guardar);
