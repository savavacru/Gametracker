import React from 'react';
import './JuegoCatalogoCard.css';

/**
 * Tarjeta individual para mostrar un juego del catálogo
 */
function JuegoCatalogoCard({ juego, onClick }) {
  return (
    <div className="juego-catalogo-card" onClick={onClick}>
      {/* Imagen del juego */}
      <div className="catalogo-card-imagen">
        {juego.imagen ? (
          <img src={juego.imagen} alt={juego.titulo} />
        ) : (
          <div className="catalogo-sin-imagen">
            <span>🎮</span>
          </div>
        )}
        
        {/* Badge de rating */}
        {juego.rating > 0 && (
          <div className="catalogo-rating">
            ⭐ {juego.rating}
          </div>
        )}
      </div>

      {/* Información del juego */}
      <div className="catalogo-card-info">
        <h3 className="catalogo-titulo">{juego.titulo}</h3>
        
        {juego.generos && (
          <p className="catalogo-generos">{juego.generos}</p>
        )}
        
        {juego.fechaLanzamiento && (
          <p className="catalogo-fecha">
            📅 {new Date(juego.fechaLanzamiento).getFullYear()}
          </p>
        )}
      </div>
    </div>
  );
}

export default JuegoCatalogoCard;
