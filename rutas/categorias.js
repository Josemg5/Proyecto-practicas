const express = require('express');
const router = express.Router();
const categoriasController = require('../controladores/controladoresCategoria'); // Importación con nombre singular

// Ruta para obtener todas las categorías
router.get('/categorias', categoriasController.obtenerTodasLasCategorias);

// Ruta para obtener una categoría por su ID
router.get('/categorias/:id', categoriasController.obtenerCategoriaPorId);

// Ruta para crear una nueva categoría
router.post('/categorias', categoriasController.crearCategoria);

// Ruta para actualizar una categoría existente
router.put('/categorias/:id', categoriasController.actualizarCategoria);

// Ruta para eliminar una categoría
router.delete('/categorias/:id', categoriasController.eliminarCategoria);

module.exports = router;
