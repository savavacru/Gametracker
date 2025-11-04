import React from 'react';
import './Home.css';

/**
 * Página de inicio de GameTracker
 * Muestra información de bienvenida y características del proyecto
 */
function Home() {
  return (
    <div className="home-container">
      {/* Sección hero principal */}
      <section className="hero-section">
        <h1 className="hero-title">Bienvenido a GameTracker 🎮</h1>
        <p className="hero-subtitle">
          Tu biblioteca personal de videojuegos
        </p>
        <p className="hero-description">
          Organiza, rastrea y descubre tus juegos favoritos en un solo lugar
        </p>
      </section>

      {/* Características principales */}
      <section className="features-section">
        <h2>¿Qué puedes hacer?</h2>
        <div className="features-grid">
          
          {/* Feature 1: Catálogo */}
          <div className="feature-card">
            <div className="feature-icon">📚</div>
            <h3>Explora el Catálogo</h3>
            <p>
              Descubre miles de juegos con información detallada, 
              imágenes y calificaciones de la comunidad.
            </p>
          </div>

          {/* Feature 2: Dashboard */}
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <h3>Tu Dashboard Personal</h3>
            <p>
              Administra tu colección, añade juegos a tu biblioteca 
              y lleva un registro de tus horas jugadas.
            </p>
          </div>

          {/* Feature 3: Estadísticas */}
          <div className="feature-card">
            <div className="feature-icon">📈</div>
            <h3>Estadísticas Detalladas</h3>
            <p>
              Visualiza tus hábitos de juego, géneros favoritos 
              y el tiempo total invertido en tus juegos.
            </p>
          </div>

          {/* Feature 4: Seguimiento */}
          <div className="feature-card">
            <div className="feature-icon">✅</div>
            <h3>Seguimiento de Progreso</h3>
            <p>
              Marca juegos como jugando, completados o pendientes. 
              Nunca pierdas la pista de tu backlog.
            </p>
          </div>
        </div>
      </section>

      {/* Sección de llamada a la acción */}
      <section className="cta-section">
        <h2>¿Listo para empezar?</h2>
        <p>
          Inicia sesión o regístrate para comenzar a construir tu biblioteca de juegos
        </p>
      </section>
    </div>
  );
}

export default Home;
