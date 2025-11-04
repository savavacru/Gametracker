import React, { useState, useEffect } from 'react';
import './Catalogo.css';

/**
 * Página de Catálogo
 * Muestra todos los juegos disponibles (globales, no por usuario)
 * Integra la API de RAWG para mostrar portadas
 */
function Catalogo() {
  // Estado para almacenar los juegos del catálogo
  const [juegos, setJuegos] = useState([]);
  // Estado para controlar si está cargando
  const [cargando, setCargando] = useState(true);
  // Estado para el término de búsqueda
  const [busqueda, setBusqueda] = useState('');

  // Cargar juegos al montar el componente
  useEffect(() => {
    cargarJuegos();
  }, []);

  /**
   * Función para obtener juegos del backend
   * Por ahora es global, no filtra por usuario
   */
  const cargarJuegos = async () => {
    try {
      setCargando(true);
      const respuesta = await fetch('http://localhost:5000/api/juegos');
      const datos = await respuesta.json();
      // Asegurarse de que datos sea un array
      setJuegos(Array.isArray(datos) ? datos : []);
    } catch (error) {
      console.error('Error al cargar juegos:', error);
      setJuegos([]); // En caso de error, establecer array vacío
    } finally {
      setCargando(false);
    }
  };

  /**
   * Filtrar juegos según el término de búsqueda
   */
  const juegosFiltrados = juegos.filter(juego =>
    juego.titulo.toLowerCase().includes(busqueda.toLowerCase()) ||
    juego.genero.toLowerCase().includes(busqueda.toLowerCase())
  );

  /**
   * Obtener URL de portada desde RAWG
   * Por ahora usamos un placeholder, pero puedes integrar la API de RAWG aquí
   */
  const obtenerPortada = (titulo) => {
    // Placeholder - en el futuro integrarás RAWG API aquí
    return `https://via.placeholder.com/300x200/2a2a2a/4a9eff?text=${encodeURIComponent(titulo)}`;
  };

  return (
    <div className="catalogo-container">
      {/* Encabezado */}
      <div className="catalogo-header">
        <h1>📚 Catálogo de Juegos</h1>
        <p>Explora todos los juegos disponibles</p>
      </div>

      {/* Barra de búsqueda */}
      <div className="search-bar">
        <input
          type="text"
          placeholder="🔍 Buscar por título o género..."
          value={busqueda}
          onChange={(e) => setBusqueda(e.target.value)}
        />
      </div>

      {/* Mostrar loader mientras carga */}
      {cargando ? (
        <div className="loading">
          <div className="spinner"></div>
          <p>Cargando juegos...</p>
        </div>
      ) : (
        <>
          {/* Contador de juegos */}
          <div className="juegos-count">
            {juegosFiltrados.length} {juegosFiltrados.length === 1 ? 'juego encontrado' : 'juegos encontrados'}
          </div>

          {/* Grid de juegos */}
          <div className="juegos-grid">
            {juegosFiltrados.length > 0 ? (
              juegosFiltrados.map((juego) => (
                <div key={juego._id} className="juego-card">
                  {/* Portada del juego */}
                  <div className="juego-imagen">
                    <img 
                      src={obtenerPortada(juego.titulo)} 
                      alt={juego.titulo}
                    />
                  </div>

                  {/* Información del juego */}
                  <div className="juego-info">
                    <h3>{juego.titulo}</h3>
                    <p className="juego-genero">🎮 {juego.genero}</p>
                    <p className="juego-horas">⏱️ {juego.horasJugadas} horas</p>
                    
                    {/* Estado del juego */}
                    <span className={`juego-estado ${juego.estado ? 'completado' : 'pendiente'}`}>
                      {juego.estado ? '✅ Completado' : '⏳ Pendiente'}
                    </span>
                  </div>
                </div>
              ))
            ) : (
              <div className="no-results">
                <p>😕 No se encontraron juegos</p>
              </div>
            )}
          </div>
        </>
      )}
    </div>
  );
}

export default Catalogo;
