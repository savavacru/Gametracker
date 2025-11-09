import React, { useState } from 'react';
import './Navbar.css';

/**
 * Componente de navegación principal
 * Muestra links a diferentes secciones de la aplicación
 * El Dashboard solo se muestra si hay un usuario logueado
 */
function Navbar({ usuario, paginaActual, onCambiarPagina, onLogout }) {
  // Estado para controlar el menú móvil
  const [menuAbierto, setMenuAbierto] = useState(false);

  // Función para cambiar página y cerrar menú
  const handleCambiarPagina = (pagina) => {
    onCambiarPagina(pagina);
    setMenuAbierto(false);
  };

  return (
    <nav className="navbar">
      {/* Logo y título de la aplicación */}
      <div className="navbar-brand">
        <h1> GameTracker</h1>
      </div>

      {/* Botón hamburguesa para móviles */}
      <button 
        className={`hamburger ${menuAbierto ? 'active' : ''}`}
        onClick={() => setMenuAbierto(!menuAbierto)}
        aria-label="Menú"
      >
        <span></span>
        <span></span>
        <span></span>
      </button>

      {/* Links de navegación */}
      <ul className={`navbar-links ${menuAbierto ? 'active' : ''}`}>
        <li>
          <button 
            className={paginaActual === 'home' ? 'active' : ''}
            onClick={() => handleCambiarPagina('home')}
          >
            Home
          </button>
        </li>
        <li>
          <button 
            className={paginaActual === 'catalogo' ? 'active' : ''}
            onClick={() => handleCambiarPagina('catalogo')}
          >
            Catálogo
          </button>
        </li>
        
        {/* Dashboard solo visible si hay usuario logueado */}
        {usuario && (
          <li>
            <button 
              className={paginaActual === 'dashboard' ? 'active' : ''}
              onClick={() => handleCambiarPagina('dashboard')}
            >
              Dashboard
            </button>
          </li>
        )}
        {usuario &&(
          <li>
            <button 
              className={paginaActual === 'estadisticas' ? 'active' : ''}
              onClick={() => handleCambiarPagina('estadisticas')}
            >
              Estadísticas
            </button>
          </li>
        )}
      </ul>

      {/* Sección de usuario: muestra login o logout según el estado */}
      <div className={`navbar-user ${menuAbierto ? 'active' : ''}`}>
        {usuario ? (
          <>
            <span className="user-name">👤 {usuario.nombre}</span>
            <button className="btn-logout" onClick={() => {
              onLogout();
              setMenuAbierto(false);
            }}>
              Cerrar Sesión
            </button>
          </>
        ) : (
          <button 
            className="btn-login"
            onClick={() => handleCambiarPagina('login')}
          >
            Iniciar Sesión
          </button>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
