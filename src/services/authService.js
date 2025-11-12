const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/usuarios`;

export const registrarUsuario = async (datosUsuario) => {
  try {
    const respuesta = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(datosUsuario),
      credentials: "include",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al registrar usuario");
    }

    return datos;
  } catch (error) {
    console.error("Error en registrarUsuario:", error);
    throw error;
  }
};

export const loginUsuario = async (credenciales) => {
  try {
    const respuesta = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credenciales),
      credentials: "include",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al iniciar sesión");
    }

    return datos;
  } catch (error) {
    console.error("Error en loginUsuario:", error);
    throw error;
  }
};

export const logoutUsuario = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/logout`, {
      method: "POST",
      credentials: "include",
    });

    const datos = await respuesta.json();

    if (!respuesta.ok) {
      throw new Error(datos.mensaje || "Error al cerrar sesión");
    }

    return datos;
  } catch (error) {
    console.error("Error en logoutUsuario:", error);
    throw error;
  }
};

export const verificarAutenticacion = async () => {
  try {
    const respuesta = await fetch(`${API_URL}/perfil`, {
      method: "GET",
      credentials: "include",
    });

    if (!respuesta.ok) {
      return null;
    }

    const datos = await respuesta.json();
    return datos.usuario;
  } catch (error) {
    console.error("Error en verificarAutenticacion:", error);
    return null;
  }
};