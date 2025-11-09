import React, { useState } from 'react';
import './DetalleJuegoOverlay.css';

/**
 * Overlay que muestra los detalles de un juego
 * Permite guardarlo en la biblioteca del usuario
 */
function DetalleJuegoOverlay({ juego, usuario, onCerrar, onGuardar }) {
  const [horasJugadas, setHorasJugadas] = useState(0);
  const [estado, setEstado] = useState(false);
  const [genero, setGenero] = useState('');

  // Normalizar géneros - pueden venir como string o array
  const generosArray = Array.isArray(juego.generos) 
    ? juego.generos 
    : (typeof juego.generos === 'string' ? [juego.generos] : []);
  
  // Normalizar plataformas - pueden venir como string o array
  const plataformasArray = Array.isArray(juego.plataformas)
    ? juego.plataformas
    : (typeof juego.plataformas === 'string' ? [juego.plataformas] : []);

  // Extraer primer género como sugerencia
  const generoSugerido = generosArray.length > 0 
    ? generosArray[0] 
    : '';

  // Manejar guardado
  const handleGuardar = () => {
    // Enviar todos los datos del juego igual que en el Dashboard
    const datosJuego = {
      titulo: juego.titulo,
      descripcion: juego.descripcion || '',
      imagen: juego.imagen || '',
      genero: genero || generoSugerido || 'Sin categoría',
      plataforma: plataformasArray.length > 0 ? plataformasArray.join(', ') : '',
      rating: Number(juego.rating) || 0,
      fechaLanzamiento: juego.fechaLanzamiento || '',
      horasJugadas: Number(horasJugadas),
      estado: estado
    };
    
    onGuardar(datosJuego);
  };

  // Prevenir propagación del clic en el contenido
  const handleContenidoClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="overlay-backdrop" onClick={onCerrar}>
      <div className="overlay-contenido" onClick={handleContenidoClick}>
        {/* Botón cerrar */}
        <button className="overlay-cerrar" onClick={onCerrar}>
          ✕
        </button>

        {/* Imagen del juego */}
        {juego.imagen && (
          <div className="overlay-imagen">
            <img src={juego.imagen} alt={juego.titulo} />
          </div>
        )}

        {/* Información del juego */}
        <div className="overlay-info">
          <h2>{juego.titulo}</h2>

          {/* Rating */}
          {juego.rating && (
            <div className="overlay-rating">
              <span className="rating-estrella">⭐</span>
              <span className="rating-valor">{juego.rating.toFixed(1)}/5</span>
            </div>
          )}

          {/* Fecha de lanzamiento */}
          {juego.fechaLanzamiento && (
            <p className="overlay-fecha">
              📅 Lanzamiento: {new Date(juego.fechaLanzamiento).toLocaleDateString('es-ES')}
            </p>
          )}

          {/* Géneros */}
          {generosArray.length > 0 && (
            <div className="overlay-generos">
              <strong>Géneros:</strong>
              <div className="generos-tags">
                {generosArray.map((gen, idx) => (
                  <span key={idx} className="genero-tag">{gen}</span>
                ))}
              </div>
            </div>
          )}

          {/* Plataformas */}
          {plataformasArray.length > 0 && (
            <div className="overlay-plataformas">
              <strong>Plataformas:</strong>
              <div className="plataformas-tags">
                {plataformasArray.slice(0, 6).map((plat, idx) => (
                  <span key={idx} className="plataforma-tag">{plat}</span>
                ))}
                {plataformasArray.length > 6 && (
                  <span className="plataforma-tag">+{plataformasArray.length - 6}</span>
                )}
              </div>
            </div>
          )}

          {/* Formulario para guardar (solo si está logueado) */}
          {usuario ? (
            <div className="overlay-formulario">
              <h3>Agregar a mi biblioteca</h3>

              <div className="form-group">
                <label>Género (opcional):</label>
                <input
                  type="text"
                  placeholder={generoSugerido || 'Ej: Acción, RPG...'}
                  value={genero}
                  onChange={(e) => setGenero(e.target.value)}
                />
              </div>

              <div className="form-group">
                <label>Horas jugadas:</label>
                <input
                  type="number"
                  min="0"
                  value={horasJugadas}
                  onChange={(e) => setHorasJugadas(e.target.value)}
                />
              </div>

              <div className="form-group-checkbox">
                <label>
                  <input
                    type="checkbox"
                    checked={estado}
                    onChange={(e) => setEstado(e.target.checked)}
                  />
                  <span>Completado</span>
                </label>
              </div>

              <button className="btn-guardar" onClick={handleGuardar}>
                💾 Guardar en mi biblioteca
              </button>
            </div>
          ) : (
            <div className="overlay-no-auth">
              <p>🔒 Inicia sesión para agregar este juego a tu biblioteca</p>
              <button className="btn-login" onClick={() => onGuardar(null)}>
                Iniciar sesión
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default DetalleJuegoOverlay;
