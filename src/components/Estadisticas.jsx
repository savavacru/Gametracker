import React from 'react';
import './Estadisticas.css';

/**
 * Página de Estadísticas
 * Muestra análisis y métricas sobre los juegos del usuario
 * Incluye gráficos visuales de horas jugadas, géneros favoritos, etc.
 */
function Estadisticas({ juegos, usuario }) {
  /**
   * Calcular estadísticas generales
   */
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.estado).length;
  const juegosPendientes = juegos.filter(j => !j.estado).length;
  const horasTotales = juegos.reduce((total, j) => total + (j.horasJugadas || 0), 0);
  const promedioHoras = totalJuegos > 0 ? (horasTotales / totalJuegos).toFixed(1) : 0;

  /**
   * Calcular juegos por género
   */
  const juegosPorGenero = juegos.reduce((acc, juego) => {
    const genero = juego.genero || 'Sin categoría';
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});

  /**
   * Calcular horas por género
   */
  const horasPorGenero = juegos.reduce((acc, juego) => {
    const genero = juego.genero || 'Sin categoría';
    acc[genero] = (acc[genero] || 0) + (juego.horasJugadas || 0);
    return acc;
  }, {});

  /**
   * Obtener el género más jugado
   */
  const generoMasJugado = Object.entries(horasPorGenero)
    .sort((a, b) => b[1] - a[1])[0];

  /**
   * Obtener los 5 juegos con más horas
   */
  const topJuegos = [...juegos]
    .sort((a, b) => (b.horasJugadas || 0) - (a.horasJugadas || 0))
    .slice(0, 5);

  return (
    <div className="estadisticas-container">
      {/* Encabezado */}
      <div className="estadisticas-header">
        <h1>Estadísticas de Juego</h1>
        {usuario && <p>Análisis de tu biblioteca, {usuario.nombre}</p>}
      </div>

      {totalJuegos === 0 ? (
        /* Mostrar mensaje si no hay juegos */
        <div className="empty-stats">
          <div className="empty-icon"></div>
          <h3>No hay estadísticas disponibles</h3>
          <p>Agrega juegos a tu biblioteca para ver tus estadísticas</p>
        </div>
      ) : (
        <>
          {/* Estadísticas principales */}
          <div className="stats-grid">
            <div className="stat-box">
              <div className="stat-value">{totalJuegos}</div>
              <div className="stat-label">Total de Juegos</div>
            </div>

            <div className="stat-box">
              <div className="stat-value">{juegosCompletados}</div>
              <div className="stat-label">Completados</div>
              <div className="stat-percentage">
                {totalJuegos > 0 ? ((juegosCompletados / totalJuegos) * 100).toFixed(0) : 0}%
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-value">{juegosPendientes}</div>
              <div className="stat-label">Pendientes</div>
              <div className="stat-percentage">
                {totalJuegos > 0 ? ((juegosPendientes / totalJuegos) * 100).toFixed(0) : 0}%
              </div>
            </div>

            <div className="stat-box">
              <div className="stat-value">{horasTotales}</div>
              <div className="stat-label">Horas Totales</div>
            </div>

            <div className="stat-box">
              <div className="stat-value">{promedioHoras}</div>
              <div className="stat-label">Promedio por Juego</div>
            </div>

            {generoMasJugado && (
              <div className="stat-box highlight">
                <div className="stat-value">🎮 {generoMasJugado[0]}</div>
                <div className="stat-label">Género Favorito</div>
                <div className="stat-detail">{generoMasJugado[1]} horas</div>
              </div>
            )}
          </div>

          {/* Distribución por género */}
          <div className="section">
            <h2>Distribución por Género</h2>
            <div className="genre-stats">
              {Object.entries(juegosPorGenero).map(([genero, cantidad]) => {
                const horas = horasPorGenero[genero] || 0;
                const porcentaje = (cantidad / totalJuegos) * 100;
                
                return (
                  <div key={genero} className="genre-item">
                    <div className="genre-header">
                      <span className="genre-name">{genero}</span>
                      <span className="genre-count">{cantidad} juegos · {horas}h</span>
                    </div>
                    <div className="genre-bar">
                      <div 
                        className="genre-bar-fill"
                        style={{ width: `${porcentaje}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Top 5 juegos más jugados */}
          {topJuegos.length > 0 && (
            <div className="section">
              <h2>🏆 Top 5 Juegos Más Jugados</h2>
              <div className="top-juegos">
                {topJuegos.map((juego, index) => (
                  <div key={juego._id} className="top-juego-item">
                    <div className="top-juego-rank">#{index + 1}</div>
                    <div className="top-juego-info">
                      <h3>{juego.titulo}</h3>
                      <p>{juego.genero}</p>
                    </div>
                    <div className="top-juego-horas">
                      {juego.horasJugadas || 0} <span>horas</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}

export default Estadisticas;
