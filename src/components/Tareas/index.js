import React, { Component } from 'react'
import { connect } from 'react-redux'

class Tareas extends Component {
  render() {
    return (
      <div>Tareas Saludar</div>
    )
  }
}

const mapStateToProps = ({tareasReducer}) => tareasReducer

export default connect(mapStateToProps)(Tareas);
