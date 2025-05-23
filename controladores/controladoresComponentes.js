const Componente = require('../modelos/componente'); // Asegúrate que el modelo Componente está importado

// Función para obtener todos los componentes
async function obtenerTodosLosComponentes(req, res) {
  try {
    const componentes = await Componente.findAll();
    res.status(200).json(componentes);
  } catch (error) {
    console.error("Error al obtener los componentes:", error);
    res.status(500).json({ error: 'No se pudieron obtener los componentes', detalles: error.message });
  }
}

// Función para obtener un componente por su ID
async function obtenerComponentePorId(req, res) {
  const { id } = req.params;
  try {
    const componente = await Componente.findByPk(id);
    if (componente) {
      res.status(200).json(componente);
    } else {
      res.status(404).json({ error: 'Componente no encontrado' });
    }
  } catch (error) {
    console.error(`Error al obtener el componente con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo obtener el componente', detalles: error.message });
  }
}

// --- ESTA ES LA FUNCIÓN MODIFICADA ---
async function crearComponente(req, res) {
  // Extraemos los campos que podrías estar enviando desde Postman
  // Asegúrate de que los campos que quieres guardar (ej. descripcion_tecnica, marca_modelo)
  // estén definidos en tu modelo Sequelize 'Componente' en modelos/componente.js
  const { nombre, precio, categoriaId, descripcion_tecnica, marca_modelo } = req.body;

  try {
    // CONSOLE.LOG DE DEPURACIÓN: Para ver qué datos realmente llegan aquí
    console.log("BACKEND DEBUG: Datos recibidos en crearComponente:", {
      nombre,
      precio,
      categoriaId,
      descripcion_tecnica, // Será undefined si no se envía o no se define en el modelo
      marca_modelo       // Será undefined si no se envía o no se define en el modelo
    });

    // Creamos el objeto para pasar a Sequelize.
    // Solo incluimos los campos que tu modelo Componente espera y puede guardar.
    // Si descripcion_tecnica y marca_modelo no están en tu modelo, puedes omitirlos aquí
    // o Sequelize los ignorará (pero es más limpio no pasarlos si no están en el modelo).
    const datosParaCrear = {
      nombre,
      precio,
      categoriaId
    };

    // Solo añade estos campos si están definidos en tu modelo 'Componente'
    // y si realmente los estás enviando y quieres guardarlos.
    if (descripcion_tecnica !== undefined) { // O una validación más robusta si es necesario
      datosParaCrear.descripcion_tecnica = descripcion_tecnica;
    }
    if (marca_modelo !== undefined) {
      datosParaCrear.marca_modelo = marca_modelo;
    }

    const nuevoComponente = await Componente.create(datosParaCrear);
    res.status(201).json(nuevoComponente);

  } catch (error) {
    console.error("Error al crear el componente:", error); // Log del error completo en el backend
    // Devolvemos un error más detallado al cliente (Postman/Frontend)
    res.status(500).json({
      error: 'No se pudo crear el componente.',
      detalles: error.message, // Mensaje de error de Sequelize/DB
      camposInvalidos: error.errors // Array de errores de validación de Sequelize si los hay
    });
  }
}
// --- FIN DE LA FUNCIÓN MODIFICADA ---

// Función para actualizar un componente existente
async function actualizarComponente(req, res) {
  const { id } = req.params;
  // Extrae todos los campos que se pueden actualizar
  const { nombre, precio, categoriaId, descripcion_tecnica, marca_modelo } = req.body;

  try {
    const datosParaActualizar = {
      nombre,
      precio,
      categoriaId
    };
    if (descripcion_tecnica !== undefined) {
      datosParaActualizar.descripcion_tecnica = descripcion_tecnica;
    }
    if (marca_modelo !== undefined) {
      datosParaActualizar.marca_modelo = marca_modelo;
    }

    const [numeroDeFilasActualizadas] = await Componente.update(datosParaActualizar, { where: { id } });

    if (numeroDeFilasActualizadas > 0) {
      const componenteActualizado = await Componente.findByPk(id);
      res.status(200).json(componenteActualizado);
    } else {
      res.status(404).json({ error: 'Componente no encontrado o datos iguales' });
    }
  } catch (error) {
    console.error(`Error al actualizar el componente con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo actualizar el componente', detalles: error.message, camposInvalidos: error.errors });
  }
}

// Función para eliminar un componente
async function eliminarComponente(req, res) {
  const { id } = req.params;
  try {
    const resultado = await Componente.destroy({ where: { id } });
    if (resultado > 0) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ error: 'Componente no encontrado' });
    }
  } catch (error) {
    console.error(`Error al eliminar el componente con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo eliminar el componente', detalles: error.message });
  }
}

module.exports = {
  obtenerTodosLosComponentes,
  obtenerComponentePorId,
  crearComponente,
  actualizarComponente,
  eliminarComponente
};
