import './App.css';
import LoginForm from './components/LoginForm';
import RegisterForm from './components/RegisterForm';
import Navbar from './components/Navbar';
import Home from './components/Home';
import Catalogo from './components/Catalogo';
import Dashboard from './components/Dashboard';
import Estadisticas from './components/Estadisticas';
import { useEffect, useState } from 'react';
import { 
  obtenerJuegos, 
  agregarJuego as agregarJuegoAPI,
  editarJuego as editarJuegoAPI,
  eliminarJuego as eliminarJuegoAPI
} from './services/juegoService';
import { verificarAutenticacion, logoutUsuario } from './services/authService';

function App() {
  const [juegos, setJuegos] = useState([]);
  const [usuario, setUsuario] = useState(null);
  const [cargandoAuth, setCargandoAuth] = useState(true);
  const [mostrarRegistro, setMostrarRegistro] = useState(false);
  const [juegoAEditar, setJuegoAEditar] = useState(null);
  // Estado para controlar la página actual (sistema de rutas simple)
  const [paginaActual, setPaginaActual] = useState('home');

  // Verificar autenticación al cargar la aplicación
  useEffect(() => {
    verificarAuth();
  }, []); 

  // Cargar juegos cuando el usuario esté autenticado
  useEffect(() => {
    if (usuario) {
      cargarJuegos();
    }
  }, [usuario]);

  const verificarAuth = async () => {
    const usuarioAutenticado = await verificarAutenticacion();
    setUsuario(usuarioAutenticado);
    setCargandoAuth(false);
  };

  const cargarJuegos = async () => {
    try {
      const datos = await obtenerJuegos();
      setJuegos(datos);
    } catch (error) {
      console.error("Error al cargar juegos:", error);
    }
  };

  const agregarJuego = async (nuevoJuego) => {
    try {
      const juegoGuardado = await agregarJuegoAPI(nuevoJuego);
      setJuegos([juegoGuardado, ...juegos]);
    } catch (error) {
      console.error("Hubo un error al agregar un juego", error);
      alert("Error al agregar el juego");
    }
  };

  const editarJuego = async (id, juegoActualizado) => {
    try {
      const juegoEditado = await editarJuegoAPI(id, juegoActualizado);
      setJuegos(juegos.map(j => j._id === id ? juegoEditado : j));
      setJuegoAEditar(null);
    } catch (error) {
      console.error("Error al editar juego:", error);
      alert("Error al editar el juego");
    }
  };

  const eliminarJuego = async (id) => {
    if (!window.confirm("¿Estás seguro de que quieres eliminar este juego?")) {
      return;
    }

    try {
      await eliminarJuegoAPI(id);
      setJuegos(juegos.filter(j => j._id !== id));
    } catch (error) {
      console.error("Error al eliminar juego:", error);
      alert("Error al eliminar el juego");
    }
  };

  const seleccionarJuegoDesdeRAWG = (datosJuego) => {
    agregarJuego(datosJuego);
  };

  const manejarLoginExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const manejarRegistroExitoso = (datosUsuario) => {
    setUsuario(datosUsuario);
  };

  const manejarLogout = async () => {
    try {
      await logoutUsuario();
      setUsuario(null);
      setJuegos([]);
      setJuegoAEditar(null);
      setPaginaActual('home'); // Volver a Home al cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  /**
   * Función para cambiar de página
   * Implementa un sistema de rutas simple sin react-router
   */
  const cambiarPagina = (nuevaPagina) => {
    setPaginaActual(nuevaPagina);
  };

  /**
   * Función para renderizar la página actual
   * según el estado de paginaActual
   */
  const renderizarPagina = () => {
    switch (paginaActual) {
      case 'home':
        return <Home />;
      
      case 'catalogo':
        return <Catalogo />;
      
      case 'dashboard':
        // Dashboard solo accesible si hay usuario
        if (!usuario) {
          setPaginaActual('home');
          return <Home />;
        }
        return (
          <Dashboard
            usuario={usuario}
            juegos={juegos}
            onAgregarJuego={agregarJuego}
            onEditarJuego={editarJuego}
            onEliminarJuego={eliminarJuego}
            juegoAEditar={juegoAEditar}
            onSeleccionarEditar={setJuegoAEditar}
            onCancelarEdicion={() => setJuegoAEditar(null)}
            onSeleccionarJuegoRAWG={seleccionarJuegoDesdeRAWG}
          />
        );
      
      case 'estadisticas':
        // Estadísticas solo accesible si hay usuario
        if (!usuario) {
          setPaginaActual('home');
          return <Home />;
        }
        return <Estadisticas juegos={juegos} usuario={usuario} />;
      
      case 'login':
        // Si ya está logueado, redirigir a dashboard
        if (usuario) {
          setPaginaActual('dashboard');
          return null;
        }
        return (
          <div style={{ maxWidth: '500px', margin: '2rem auto' }}>
            {mostrarRegistro ? (
              <RegisterForm
                onRegistroExitoso={manejarRegistroExitoso}
                onCambiarALogin={() => setMostrarRegistro(false)}
              />
            ) : (
              <LoginForm
                onLoginExitoso={manejarLoginExitoso}
                onCambiarARegistro={() => setMostrarRegistro(true)}
              />
            )}
          </div>
        );
      
      default:
        return <Home />;
    }
  };

  // Mostrar loader mientras se verifica la autenticación
  if (cargandoAuth) {
    return (
      <div className="app-container">
        <div className="loading">Cargando...</div>
      </div>
    );
  }

  // Si no está autenticado, mostrar formularios de login/registro
  if (!usuario && paginaActual === 'login') {
    return (
      <div className="app-container">
        <Navbar
          usuario={usuario}
          paginaActual={paginaActual}
          onCambiarPagina={cambiarPagina}
          onLogout={manejarLogout}
        />
        {mostrarRegistro ? (
          <RegisterForm
            onRegistroExitoso={manejarRegistroExitoso}
            onCambiarALogin={() => setMostrarRegistro(false)}
          />
        ) : (
          <LoginForm
            onLoginExitoso={manejarLoginExitoso}
            onCambiarARegistro={() => setMostrarRegistro(true)}
          />
        )}
      </div>
    );
  }

  // Aplicación principal con navegación
  return (
    <div className='app-container'>
      {/* Barra de navegación siempre visible */}
      <Navbar
        usuario={usuario}
        paginaActual={paginaActual}
        onCambiarPagina={cambiarPagina}
        onLogout={manejarLogout}
      />

      {/* Renderizar la página actual */}
      <div className="page-content">
        {renderizarPagina()}
      </div>
    </div>
  );
}

export default App;