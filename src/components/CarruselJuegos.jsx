import React, { useRef } from 'react';
import JuegoCatalogoCard from './JuegoCatalogoCard';
import './CarruselJuegos.css';

/**
 * Carrusel horizontal de juegos
 * Permite desplazamiento horizontal para mostrar múltiples juegos
 */
function CarruselJuegos({ titulo, juegos, cargando, onJuegoClick }) {
  const carruselRef = useRef(null);

  // Funciones para desplazar el carrusel
  const desplazarIzquierda = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: -300, behavior: 'smooth' });
    }
  };

  const desplazarDerecha = () => {
    if (carruselRef.current) {
      carruselRef.current.scrollBy({ left: 300, behavior: 'smooth' });
    }
  };

  return (
    <div className="carrusel-seccion">
      {/* Encabezado del carrusel */}
      <div className="carrusel-header">
        <h2>{titulo}</h2>
        <div className="carrusel-controles">
          <button 
            className="carrusel-btn carrusel-btn-izq" 
            onClick={desplazarIzquierda}
            aria-label="Anterior"
          >
            ←
          </button>
          <button 
            className="carrusel-btn carrusel-btn-der" 
            onClick={desplazarDerecha}
            aria-label="Siguiente"
          >
            →
          </button>
        </div>
      </div>

      {/* Contenedor del carrusel */}
      {cargando ? (
        <div className="carrusel-loading">
          <div className="spinner"></div>
          <p>Cargando juegos...</p>
        </div>
      ) : juegos.length > 0 ? (
        <div className="carrusel-contenedor" ref={carruselRef}>
          {juegos.map((juego) => (
            <JuegoCatalogoCard 
              key={juego.id} 
              juego={juego} 
              onClick={() => onJuegoClick && onJuegoClick(juego)}
            />
          ))}
        </div>
      ) : (
        <div className="carrusel-vacio">
          <p>No se encontraron juegos en esta categoría</p>
        </div>
      )}
    </div>
  );
}

export default CarruselJuegos;
