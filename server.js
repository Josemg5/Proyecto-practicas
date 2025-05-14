const express = require('express');
const app = express();
const port = 3000;
const path = require('path');

// Importar la instancia de Sequelize configurada
const sequelize = require('./database/database');

// Importar los enrutadores
const categoriasRoutes = require('./rutas/categorias');
const componentesRoutes = require('./rutas/componentes');

// Middleware para parsear JSON
app.use(express.json());

// Montar los enrutadores bajo el prefijo /api
app.use('/api', categoriasRoutes);
app.use('/api', componentesRoutes);

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false }) // 'force: true' recreará las tablas (cuidado en producción)
  .then(() => console.log('Modelos sincronizados con la base de datos.'))
  .catch(err => console.error('Error al sincronizar los modelos:', err));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
