const express = require('express');
const sqlite3 = require('sqlite3').verbose(); // Importa la librería de SQLite con mensajes de error detallados
const app = express();
const port = 3000;

// Middleware para parsear el cuerpo de las peticiones como JSON
app.use(express.json());

// Conectar a la base de datos SQLite
const db = new sqlite3.Database('./mi_proyecto.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// Ejemplo de una ruta GET para obtener todas las categorías
app.get('/api/categorias', (req, res) => {
    db.all('SELECT id, nombre, descripcion FROM categorias', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ categorias: rows });
    });
});

// Iniciar el servidor
app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});