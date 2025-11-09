import React, { useState, useEffect } from 'react';
import CarruselJuegos from './CarruselJuegos';
import BuscadorJuegos from './BuscadorJuegos';
import DetalleJuegoOverlay from './DetalleJuegoOverlay';
import { obtenerJuegosPorCategoria } from '../services/juegoService';
import './Catalogo.css';

/**
 * Página de Catálogo
 * Muestra juegos organizados en carruseles por categoría
 * Usa la API de RAWG para obtener datos de juegos populares
 */
function Catalogo({ usuario, onAgregarJuego, onCambiarVista }) {
  // Estados para cada categoría de juegos
  const [juegosPopulares, setJuegosPopulares] = useState([]);
  const [juegosAccion, setJuegosAccion] = useState([]);
  const [juegosAventura, setJuegosAventura] = useState([]);
  const [juegosEstrategia, setJuegosEstrategia] = useState([]);
  
  // Estados de carga
  const [cargandoPopulares, setCargandoPopulares] = useState(true);
  const [cargandoAccion, setCargandoAccion] = useState(true);
  const [cargandoAventura, setCargandoAventura] = useState(true);
  const [cargandoEstrategia, setCargandoEstrategia] = useState(true);

  // Estado para el overlay de detalles
  const [juegoSeleccionado, setJuegoSeleccionado] = useState(null);

  // Cargar todas las categorías al montar el componente
  useEffect(() => {
    cargarCategorias();
  }, []);

  const cargarCategorias = async () => {
    // Cargar juegos populares
    try {
      const populares = await obtenerJuegosPorCategoria('populares');
      setJuegosPopulares(populares);
    } catch (error) {
      console.error('Error al cargar juegos populares:', error);
    } finally {
      setCargandoPopulares(false);
    }

    // Cargar juegos de acción
    try {
      const accion = await obtenerJuegosPorCategoria('accion');
      setJuegosAccion(accion);
    } catch (error) {
      console.error('Error al cargar juegos de acción:', error);
    } finally {
      setCargandoAccion(false);
    }

    // Cargar juegos de aventura
    try {
      const aventura = await obtenerJuegosPorCategoria('aventura');
      setJuegosAventura(aventura);
    } catch (error) {
      console.error('Error al cargar juegos de aventura:', error);
    } finally {
      setCargandoAventura(false);
    }

    // Cargar juegos de estrategia
    try {
      const estrategia = await obtenerJuegosPorCategoria('estrategia');
      setJuegosEstrategia(estrategia);
    } catch (error) {
      console.error('Error al cargar juegos de estrategia:', error);
    } finally {
      setCargandoEstrategia(false);
    }
  };

  const handleJuegoClick = (juego) => {
    setJuegoSeleccionado(juego);
  };

  const handleCerrarOverlay = () => {
    setJuegoSeleccionado(null);
  };

  const handleGuardarJuego = async (datosJuego) => {
    if (!usuario) {
      alert('Debes iniciar sesión para guardar juegos en tu biblioteca');
      onCambiarVista('login');
      return;
    }

    try {
      await onAgregarJuego(datosJuego);
      alert('¡Juego agregado a tu biblioteca!');
      handleCerrarOverlay();
    } catch (error) {
      console.error('Error al guardar juego:', error);
      alert('Error al guardar el juego. Inténtalo de nuevo.');
    }
  };

  return (
    <div className="catalogo-container">
      <div className="catalogo-header">
        <h1>Catálogo de Juegos</h1>
        <p>Descubre los mejores juegos organizados por categorías</p>
      </div>

      <BuscadorJuegos onSeleccionarJuego={handleJuegoClick} />

      <div className="catalogo-carruseles">
        <CarruselJuegos 
          titulo="Juegos Populares" 
          juegos={juegosPopulares} 
          cargando={cargandoPopulares}
          onJuegoClick={handleJuegoClick}
        />

        <CarruselJuegos 
          titulo="Acción" 
          juegos={juegosAccion} 
          cargando={cargandoAccion}
          onJuegoClick={handleJuegoClick}
        />

        <CarruselJuegos 
          titulo="Aventura" 
          juegos={juegosAventura} 
          cargando={cargandoAventura}
          onJuegoClick={handleJuegoClick}
        />

        <CarruselJuegos 
          titulo="Estrategia" 
          juegos={juegosEstrategia} 
          cargando={cargandoEstrategia}
          onJuegoClick={handleJuegoClick}
        />
      </div>

      {juegoSeleccionado && (
        <DetalleJuegoOverlay
          juego={juegoSeleccionado}
          usuario={usuario}
          onCerrar={handleCerrarOverlay}
          onGuardar={handleGuardarJuego}
        />
      )}
    </div>
  );
}

export default Catalogo;
