import React from 'react';
import './Estadisticas.css';

function Estadisticas({ juegos, usuario }) {
  const totalJuegos = juegos.length;
  const juegosCompletados = juegos.filter(j => j.estado).length;
  const juegosPendientes = juegos.filter(j => !j.estado).length;
  const horasTotales = juegos.reduce((total, j) => total + (j.horasJugadas || 0), 0);
  const promedioHoras = totalJuegos > 0 ? (horasTotales / totalJuegos).toFixed(1) : 0;
  const porcentajeCompletados = totalJuegos > 0 ? ((juegosCompletados / totalJuegos) * 100).toFixed(0) : 0;

  const juegosPorGenero = juegos.reduce((acc, juego) => {
    const genero = juego.genero || 'Sin categoría';
    acc[genero] = (acc[genero] || 0) + 1;
    return acc;
  }, {});

  const horasPorGenero = juegos.reduce((acc, juego) => {
    const genero = juego.genero || 'Sin categoría';
    acc[genero] = (acc[genero] || 0) + (juego.horasJugadas || 0);
    return acc;
  }, {});

  const generosMasJugados = Object.entries(horasPorGenero).sort((a, b) => b[1] - a[1]);
  const generoFavorito = generosMasJugados[0];

  const topJuegos = [...juegos].sort((a, b) => (b.horasJugadas || 0) - (a.horasJugadas || 0)).slice(0, 5);

  const generosOrdenados = Object.entries(juegosPorGenero).sort((a, b) => b[1] - a[1]);

  return (
    <div className="estadisticas-container">
      <div className="estadisticas-header">
        <div className="header-content">
          <h1>Mis Estadísticas</h1>
          {usuario && <p className="header-subtitle">Resumen de tu actividad gamer</p>}
        </div>
      </div>

      {totalJuegos === 0 ? (
        <div className="empty-stats">
          <div className="empty-icon">🎮</div>
          <h3>Aún no tienes estadísticas</h3>
          <p>Comienza a agregar juegos a tu biblioteca para ver tu progreso</p>
        </div>
      ) : (
        <div className="stats-content">
          <div className="stats-cards-grid">
            <div className="stat-card primary">
              <div className="stat-icon">🎮</div>
              <div className="stat-info">
                <div className="stat-value">{totalJuegos}</div>
                <div className="stat-label">Juegos en Biblioteca</div>
              </div>
            </div>

            <div className="stat-card accent">
              <div className="stat-icon">⏱️</div>
              <div className="stat-info">
                <div className="stat-value">{horasTotales}</div>
                <div className="stat-label">Horas Jugadas</div>
                <div className="stat-extra">{promedioHoras}h promedio</div>
              </div>
            </div>

            <div className="stat-card success">
              <div className="stat-icon">✅</div>
              <div className="stat-info">
                <div className="stat-value">{juegosCompletados}</div>
                <div className="stat-label">Completados</div>
                <div className="stat-extra">{porcentajeCompletados}% del total</div>
              </div>
            </div>

            <div className="stat-card warning">
              <div className="stat-icon">⏳</div>
              <div className="stat-info">
                <div className="stat-value">{juegosPendientes}</div>
                <div className="stat-label">Pendientes</div>
                <div className="stat-extra">{100 - porcentajeCompletados}% restante</div>
              </div>
            </div>
          </div>

          <div className="stats-two-column">
            {generoFavorito && (
              <div className="stat-section featured">
                <div className="section-header">
                  <h2>Tu Género Favorito</h2>
                </div>
                <div className="featured-content">
                  <div className="featured-genre">
                    <div className="featured-icon">🎯</div>
                    <h3>{generoFavorito[0]}</h3>
                    <div className="featured-stats">
                      <div className="featured-stat">
                        <span className="featured-value">{generoFavorito[1]}</span>
                        <span className="featured-label">horas jugadas</span>
                      </div>
                      <div className="featured-stat">
                        <span className="featured-value">{juegosPorGenero[generoFavorito[0]]}</span>
                        <span className="featured-label">juegos</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div className="stat-section">
              <div className="section-header">
                <h2>Progreso General</h2>
              </div>
              <div className="progress-content">
                <div className="progress-circle-wrapper">
                  <svg className="progress-circle" viewBox="0 0 120 120">
                    <circle className="progress-circle-bg" cx="60" cy="60" r="50" />
                    <circle className="progress-circle-fill" cx="60" cy="60" r="50" strokeDasharray={`${porcentajeCompletados * 3.14} ${314 - porcentajeCompletados * 3.14}`} />
                    <text x="60" y="65" className="progress-text">{porcentajeCompletados}%</text>
                  </svg>
                </div>
                <div className="progress-details">
                  <div className="progress-item">
                    <span className="progress-bullet completed"></span>
                    <span>{juegosCompletados} Completados</span>
                  </div>
                  <div className="progress-item">
                    <span className="progress-bullet pending"></span>
                    <span>{juegosPendientes} Pendientes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {topJuegos.length > 0 && (
            <div className="stat-section">
              <div className="section-header">
                <h2>Tus Juegos Más Jugados</h2>
                <span className="section-subtitle">Top {topJuegos.length} por horas</span>
              </div>
              <div className="top-juegos-list">
                {topJuegos.map((juego, index) => {
                  const maxHoras = topJuegos[0].horasJugadas || 1;
                  const porcentaje = ((juego.horasJugadas || 0) / maxHoras) * 100;
                  
                  return (
                    <div key={juego._id} className="top-juego-card">
                      <div className={`juego-rank rank-${index + 1}`}>{index + 1}</div>
                      <div className="juego-details">
                        <h4>{juego.titulo}</h4>
                        <span className="juego-genre">{juego.genero}</span>
                      </div>
                      <div className="juego-hours-bar">
                        <div className="hours-bar-fill" style={{ width: `${porcentaje}%` }}></div>
                      </div>
                      <div className="juego-hours">
                        <span className="hours-value">{juego.horasJugadas || 0}</span>
                        <span className="hours-label">horas</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          <div className="stat-section">
            <div className="section-header">
              <h2>Biblioteca por Géneros</h2>
              <span className="section-subtitle">{generosOrdenados.length} géneros diferentes</span>
            </div>
            <div className="genres-grid">
              {generosOrdenados.map(([genero, cantidad]) => {
                const horas = horasPorGenero[genero] || 0;
                const porcentaje = (cantidad / totalJuegos) * 100;
                
                return (
                  <div key={genero} className="genre-card">
                    <div className="genre-card-header">
                      <h4>{genero}</h4>
                      <span className="genre-count">{cantidad}</span>
                    </div>
                    <div className="genre-bar-container">
                      <div className="genre-bar" style={{ width: `${porcentaje}%` }}></div>
                    </div>
                    <div className="genre-card-footer">
                      <span>{porcentaje.toFixed(0)}% de tu biblioteca</span>
                      <span>{horas}h jugadas</span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Estadisticas;
