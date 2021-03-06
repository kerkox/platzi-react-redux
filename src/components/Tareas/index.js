import React, { Component } from "react";
import { connect } from "react-redux";
import { Link } from 'react-router-dom';

import * as tareasActions from "../../actions/tareasActions";
import Spinner from "../Shared/Spinner/Spinner";
import Fatal from "../Shared/Fatal/Fatal";

class Tareas extends Component {
  componentDidMount() {
    if(!Object.keys(this.props.tareas).length){
      this.props.traerTodas();
    }
  }

  componentDidUpdate(){
    const { tareas, cargando, traerTodas } = this.props
    if (!Object.keys(tareas).length && !cargando) {
      traerTodas();
    }
  }
  mostrarContenido = () => {
    const { tareas, cargando, error } = this.props;
    
    if (error) {
      return <Fatal/>
    }
    
    if (cargando) {
      return <Spinner/>;
    }

    return Object.keys(tareas).map((user_id) => (
      <div key={user_id}>
        <h2>
          {user_id}
        </h2>
        <div className="contenedor_tareas">
          { this.ponerTareas(user_id) }
        </div>
      </div>
    ))
  }

  ponerTareas = (user_id) => {
    const { tareas, cambioCheck, eliminar } = this.props;
    const por_usuario = {
      ...tareas[user_id]
    };
    return Object.keys(por_usuario).map((tar_id) => (
      <div key={tar_id}>
        <input
          type="checkbox"
          defaultChecked={por_usuario[tar_id].completed}
          onChange={() => cambioCheck(user_id, tar_id) }
        />
        {por_usuario[tar_id].title}
        <button className="m_left">
          <Link to={`/tareas/guardar/${user_id}/${tar_id}`}>Editar</Link>
        </button>
        <button className="m_left" onClick={ () => eliminar(tar_id) }>Eliminar</button>
      </div>
    ));
  }

  render() {
    return (
      <div>
        <button>
        <Link to='/tareas/guardar'>
          Agregar
        </Link>
        </button>
        { this.mostrarContenido() }
      </div>
    );
  }
}

const mapStateToProps = ({ tareasReducer }) => tareasReducer;

export default connect(mapStateToProps, tareasActions)(Tareas);
