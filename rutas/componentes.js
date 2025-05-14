const express = require('express');
const router = express.Router();
const componentesController = require('../controladores/controladoresComponentes');

// Ruta para obtener todos los componentes
router.get('/componentes', componentesController.obtenerTodosLosComponentes);

// Ruta para obtener un componente por su ID
router.get('/componentes/:id', componentesController.obtenerComponentePorId);

// Ruta para crear un nuevo componente
router.post('/componentes', componentesController.crearComponente);

// Ruta para actualizar un componente existente
router.put('/componentes/:id', componentesController.actualizarComponente);

// Ruta para eliminar un componente
router.delete('/componentes/:id', componentesController.eliminarComponente);

module.exports = router;
