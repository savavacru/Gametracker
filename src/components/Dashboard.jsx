import React from 'react';
import ListaJuegos from './ListaJuegos';
import FormularioJuego from './FormularioJuego';
import BuscadorJuegos from './BuscadorJuegos';
import './Dashboard.css';

/**
 * Página Dashboard
 * Solo accesible para usuarios logueados
 * Muestra los juegos personales del usuario y permite gestionarlos
 */
function Dashboard({ 
  usuario, 
  juegos, 
  onAgregarJuego, 
  onEditarJuego, 
  onEliminarJuego,
  juegoAEditar,
  onSeleccionarEditar,
  onCancelarEdicion,
  onSeleccionarJuegoRAWG 
}) {
  return (
    <div className="dashboard-container">
      {/* Encabezado del Dashboard */}
      <div className="dashboard-header">
        <h1>📊 Mi Dashboard</h1>
        <p>Bienvenido, <strong>{usuario.nombre}</strong></p>
      </div>

      {/* Resumen rápido */}
      <div className="dashboard-stats">
        <div className="stat-card">
          <div className="stat-icon">🎮</div>
          <div className="stat-info">
            <h3>{juegos.length}</h3>
            <p>Juegos en biblioteca</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-info">
            <h3>{juegos.filter(j => j.estado).length}</h3>
            <p>Juegos completados</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏱️</div>
          <div className="stat-info">
            <h3>{juegos.reduce((total, j) => total + (j.horasJugadas || 0), 0)}</h3>
            <p>Horas totales jugadas</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{juegos.filter(j => !j.estado).length}</h3>
            <p>Juegos pendientes</p>
          </div>
        </div>
      </div>

      {/* Layout principal: Sidebar + Contenido */}
      <div className="dashboard-content">
        {/* Sidebar con formularios */}
        <div className="dashboard-sidebar">
          {/* Buscador de juegos RAWG */}
          <BuscadorJuegos onSeleccionarJuego={onSeleccionarJuegoRAWG} />
          
          {/* Formulario para agregar/editar juegos */}
          <FormularioJuego
            onAgregarJuego={onAgregarJuego}
            onEditarJuego={onEditarJuego}
            juegoAEditar={juegoAEditar}
            onCancelarEdicion={onCancelarEdicion}
          />
        </div>

        {/* Contenido principal: Lista de juegos */}
        <div className="dashboard-main">
          <div className="juegos-header">
            <h2>📚 Mi Biblioteca</h2>
            <span className="juegos-count">
              {juegos.length} {juegos.length === 1 ? 'juego' : 'juegos'}
            </span>
          </div>

          {juegos.length > 0 ? (
            <ListaJuegos
              juegos={juegos}
              onEditar={onSeleccionarEditar}
              onEliminar={onEliminarJuego}
            />
          ) : (
            <div className="empty-state">
              <div className="empty-icon">🎮</div>
              <h3>Tu biblioteca está vacía</h3>
              <p>Comienza agregando tu primer juego usando el buscador o el formulario</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
