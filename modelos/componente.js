const { DataTypes } = require('sequelize');
const sequelize = require('../database/database'); // Tu instancia de Sequelize
const Categoria = require('./categoria');     // Importa el modelo Categoria

const Componente = sequelize.define('Componente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false // El nombre sigue siendo obligatorio
  },
  descripcion_tecnica: { // Nuevo campo, lo hacemos opcional
    type: DataTypes.TEXT, // TEXT es bueno para descripciones más largas
    allowNull: true
  },
  marca_modelo: { // Nuevo campo, lo hacemos opcional
    type: DataTypes.STRING,
    allowNull: true
  },
  precio: {
    type: DataTypes.FLOAT, // O DataTypes.DECIMAL(10, 2) para mayor precisión monetaria
    allowNull: false // El precio sigue siendo obligatorio
  },
  categoriaId: { // Este es el campo clave para la relación
    type: DataTypes.INTEGER,
    allowNull: false, // Sigue siendo obligatorio para la relación
    references: {
      model: 'categorias', // <-- CAMBIO IMPORTANTE AQUÍ: Nombre exacto de la tabla
      key: 'id'           // A la columna 'id' de la tabla categorias
    }
  }
}, {
  // Opciones del modelo
  tableName: 'Componentes', // El nombre de esta tabla es Componentes (con mayúscula)
  timestamps: false       // Si no usas las columnas createdAt y updatedAt
});

// --- Definición de Asociaciones ---
// Un Componente pertenece a una Categoria
Componente.belongsTo(Categoria, { // Sequelize usa el modelo Categoria aquí para sus métodos de asociación
  foreignKey: 'categoriaId',      // La clave foránea en el modelo Componente
  as: 'categoria'                 // Un alias opcional
});

// Una Categoria puede tener muchos Componentes
Categoria.hasMany(Componente, {
  foreignKey: 'categoriaId', // La clave foránea en el modelo Componente
  as: 'componentes'         // Un alias opcional
});

module.exports = Componente;
