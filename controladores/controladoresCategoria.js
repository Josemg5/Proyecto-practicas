// Importa el modelo de la categoría (aún no creado)
const Categoria = require('../modelos/categoria');

// Función para obtener todas las categorías
async function obtenerTodasLasCategorias(req, res) {
  try {
    const categorias = await Categoria.findAll(); // Suponemos que el modelo tiene un método findAll
    res.status(200).json(categorias);
  } catch (error) {
    console.error("Error al obtener las categorías:", error);
    res.status(500).json({ error: 'No se pudieron obtener las categorías' });
  }
}

// Función para obtener una categoría por su ID
async function obtenerCategoriaPorId(req, res) {
  const { id } = req.params;
  try {
    const categoria = await Categoria.findByPk(id); // Suponemos que el modelo tiene un método findByPk
    if (categoria) {
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(`Error al obtener la categoría con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo obtener la categoría' });
  }
}

// Función para crear una nueva categoría
async function crearCategoria(req, res) {
  const { nombre } = req.body;
  try {
    const nuevaCategoria = await Categoria.create({ nombre }); // Suponemos que el modelo tiene un método create
    res.status(201).json(nuevaCategoria);
  } catch (error) {
    console.error("Error al crear la categoría:", error);
    res.status(500).json({ error: 'No se pudo crear la categoría' });
  }
}

// Función para actualizar una categoría existente
async function actualizarCategoria(req, res) {
  const { id } = req.params;
  const { nombre } = req.body;
  try {
    const categoriaActualizada = await Categoria.update({ nombre }, { where: { id } }); // Suponemos un método update
    if (categoriaActualizada[0] > 0) {
      const categoria = await Categoria.findByPk(id);
      res.status(200).json(categoria);
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(`Error al actualizar la categoría con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo actualizar la categoría' });
  }
}

// Función para eliminar una categoría
async function eliminarCategoria(req, res) {
  const { id } = req.params;
  try {
    const resultado = await Categoria.destroy({ where: { id } }); // Suponemos un método destroy
    if (resultado > 0) {
      res.status(204).send(); // 204 No Content para indicar éxito sin cuerpo de respuesta
    } else {
      res.status(404).json({ error: 'Categoría no encontrada' });
    }
  } catch (error) {
    console.error(`Error al eliminar la categoría con ID ${id}:`, error);
    res.status(500).json({ error: 'No se pudo eliminar la categoría' });
  }
}

module.exports = {
  obtenerTodasLasCategorias,
  obtenerCategoriaPorId,
  crearCategoria,
  actualizarCategoria,
  eliminarCategoria
};
