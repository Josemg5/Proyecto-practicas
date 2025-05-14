// Importa el modelo del componente (aún no creado)
const Componente = require('../modelos/componente');

// Función para obtener todos los componentes
async function obtenerTodosLosComponentes(req, res) {
  try {
    const componentes = await Componente.findAll(); // Suponemos que el modelo tiene un método findAll
    res.status(200).json(componentes);
  } catch (error) {
    console.error("Error al obtener los componentes:", error);
    res.status(500).json({ error: 'No se pudieron obtener los componentes' });
  }
}

// Función para obtener un componente por su ID
async function obtenerComponentePorId(req, res) {
  const { id } = req.params;
  try {
    const componente = await Componente.findByPk(id); // Suponemos que el modelo tiene un método findByPk
    if (componente) {
      res.status(200).json(componente);
    } else {
      res.status(404).json({ error: 'Componente no encontrado' });
    }
  } catch (error) {
    console.error(`Error al obtener el componente con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo obtener el componente' });
  }
}

// Función para crear un nuevo componente
async function crearComponente(req, res) {
  const { nombre, precio, categoriaId } = req.body;
  try {
    const nuevoComponente = await Componente.create({ nombre, precio, categoriaId }); // Suponemos un método create
    res.status(201).json(nuevoComponente);
  } catch (error) {
    console.error("Error al crear el componente:", error);
    res.status(500).json({ error: 'No se pudo crear el componente' });
  }
}

// Función para actualizar un componente existente
async function actualizarComponente(req, res) {
  const { id } = req.params;
  const { nombre, precio, categoriaId } = req.body;
  try {
    const componenteActualizado = await Componente.update({ nombre, precio, categoriaId }, { where: { id } }); // Suponemos un método update
    if (componenteActualizado[0] > 0) {
      const componente = await Componente.findByPk(id);
      res.status(200).json(componente);
    } else {
      res.status(404).json({ error: 'Componente no encontrado' });
    }
  } catch (error) {
    console.error(`Error al actualizar el componente con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo actualizar el componente' });
  }
}

// Función para eliminar un componente
async function eliminarComponente(req, res) {
  const { id } = req.params;
  try {
    const resultado = await Componente.destroy({ where: { id } }); // Suponemos un método destroy
    if (resultado > 0) {
      res.status(204).send(); // 204 No Content
    } else {
      res.status(404).json({ error: 'Componente no encontrado' });
    }
  } catch (error) {
    console.error(`Error al eliminar el componente con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo eliminar el componente' });
  }
}

module.exports = {
  obtenerTodosLosComponentes,
  obtenerComponentePorId,
  crearComponente,
  actualizarComponente,
  eliminarComponente
};
