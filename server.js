const express = require('express');
const cors = require('cors'); // Importado
const sqlite3 = require('sqlite3').verbose(); // Ok, aunque usas Sequelize abajo
const app = express();
const port = 3000;
const path = require('path');

// Importar la instancia de Sequelize configurada
const sequelize = require('./database/database');

// Importar los enrutadores
const categoriasRoutes = require('./rutas/categorias');
const componentesRoutes = require('./rutas/componentes');

// --- AÑADE CORS AQUÍ ---
// Opción A: Permitir todas las peticiones (más simple para desarrollo)
app.use(cors());
// Opción B: Permitir solo desde tu frontend Vue (más seguro)
// app.use(cors({ origin: 'http://localhost:5173' })); // Reemplaza 5173 si es necesario

// Middleware para parsear JSON (esto está bien donde está, después de cors o antes es usualmente ok)
app.use(express.json());

// Montar los enrutadores bajo el prefijo /api
// ESTO SIGNIFICA QUE TUS RUTAS SON /api/categorias, /api/componentes, etc.
app.use('/api', categoriasRoutes);
app.use('/api', componentesRoutes);

// Sincronizar los modelos con la base de datos
sequelize.sync({ force: false })
  .then(() => console.log('Modelos sincronizados con la base de datos.'))
  .catch(err => console.error('Error al sincronizar los modelos:', err));

app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
