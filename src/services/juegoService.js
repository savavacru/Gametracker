const API_URL = `${process.env.REACT_APP_API_URL || "http://localhost:5000/api"}/juegos`;

export const obtenerJuegos = async () => {
    try {
        const url = `${API_URL}?_t=${Date.now()}`;
        const respuesta = await fetch(url, {
            credentials: "include",
            cache: 'no-cache',
        });
        
        if (!respuesta.ok) {
            throw new Error("Error al obtener juegos");
        }
        
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Hubo un error al traer los datos:", error);
        return [];
    }
};

export const agregarJuego = async (nuevoJuego) => {
    try {
        const respuesta = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(nuevoJuego),
            credentials: "include",
        });
        
        if (!respuesta.ok) {
            throw new Error("Error al agregar juego");
        }
        
        const datos = await respuesta.json();
        return datos;
    } catch (error) {
        console.error("Hubo un error al agregar juego:", error);
        throw error;
    }
};

export const editarJuego = async (id, juegoActualizado) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(juegoActualizado),
            credentials: "include",
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.mensaje || "Error al editar juego");
        }

        return await respuesta.json();
    } catch (error) {
        console.error("Error al editar juego:", error);
        throw error;
    }
};

export const eliminarJuego = async (id) => {
    try {
        const respuesta = await fetch(`${API_URL}/${id}`, {
            method: "DELETE",
            credentials: "include",
        });

        if (!respuesta.ok) {
            const error = await respuesta.json();
            throw new Error(error.mensaje || "Error al eliminar juego");
        }

        return await respuesta.json();
    } catch (error) {
        console.error("Error al eliminar juego:", error);
        throw error;
    }
};

export const buscarJuegosRAWG = async (nombre) => {
    try {
        if (!nombre || nombre.trim() === "") {
            return [];
        }

        const respuesta = await fetch(`${API_URL}/buscar/${encodeURIComponent(nombre)}`);

        if (!respuesta.ok) {
            throw new Error("Error al buscar juegos en RAWG");
        }

        return await respuesta.json();
    } catch (error) {
        console.error("Error al buscar juegos en RAWG:", error);
        return [];
    }
};

export const obtenerJuegosPorCategoria = async (categoria) => {
    try {
        const respuesta = await fetch(`${API_URL}/catalogo/${categoria}`);
        
        if (!respuesta.ok) {
            throw new Error(`Error al obtener juegos de ${categoria}`);
        }
        
        return await respuesta.json();
    } catch (error) {
        console.error(`Error al obtener juegos de ${categoria}:`, error);
        return [];
    }
};