import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom'
import Menu from './Menu';
import Usuarios from './usuarios/index'
import Publicaciones from './Publicaciones';
import Tareas from './Tareas/index';
import TareasGuardar from './Tareas/Guardar';



const App = () => (
  <BrowserRouter>
    <Menu />
    <div className="margen">
      <Route exact path="/" component={Usuarios} />
      <Route exact path="/tareas" component={Tareas} />
      <Route exact path="/tareas/guardar" component={TareasGuardar} />
      <Route exact path="/tareas/guardar/:user_id/:tarea_id" component={TareasGuardar} />
      <Route exact path="/publicaciones/:key" component={Publicaciones} />
    </div>
  </BrowserRouter>
);

export default App;