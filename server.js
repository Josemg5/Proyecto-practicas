const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const app = express();
const port = 3000;

app.use(express.json()); // Middleware para parsear JSON en el cuerpo de las peticiones

const db = new sqlite3.Database('./db_tienda.db', (err) => {
    if (err) {
        console.error('Error al conectar a la base de datos:', err.message);
    } else {
        console.log('Conectado a la base de datos SQLite.');
    }
});

// --- Rutas para Categorías ---

// GET para obtener todas las categorías
app.get('/api/categorias', (req, res) => {
    db.all('SELECT id, nombre, descripcion FROM categorias', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ categorias: rows });
    });
});

// POST para crear una nueva categoría
app.post('/api/categorias', (req, res) => {
    const { nombre, descripcion } = req.body;
    if (!nombre) {
        return res.status(400).json({ error: 'El nombre es obligatorio.' });
    }
    db.run('INSERT INTO categorias (nombre, descripcion) VALUES (?, ?)', [nombre, descripcion], function(err) {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.status(201).json({ id: this.lastID, nombre, descripcion, message: 'Categoría creada con éxito.' });
    });
});



// GET para obtener todos los componentes
app.get('/api/componentes', (req, res) => {
    db.all('SELECT id, nombre, categoria_id, technical_description, brand_model, price FROM componentes', [], (err, rows) => {
        if (err) {
            res.status(500).json({ error: err.message });
            return;
        }
        res.json({ componentes: rows });
    });
});

// POST para crear un nuevo componente
app.post('/api/componentes', (req, res) => {
    const { nombre, categoria_id, technical_description, brand_model, price } = req.body;
    if (!nombre || !categoria_id) {
        return res.status(400).json({ error: 'El nombre y la categoría son obligatorios.' });
    }
    db.run('INSERT INTO componentes (nombre, categoria_id, technical_description, brand_model, price) VALUES (?, ?, ?, ?, ?)',
        [nombre, categoria_id, technical_description, brand_model, price], function(err) {
            if (err) {
                res.status(500).json({ error: err.message });
                return;
            }
            res.status(201).json({ id: this.lastID, nombre, categoria_id, technical_description, brand_model, price, message: 'Componente creado con éxito.' });
        });
});

app.listen(port, () => {
    console.log(`Servidor escuchando en http://localhost:${port}`);
});