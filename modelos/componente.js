const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');
const Categoria = require('./categoria'); // Importamos el modelo de Categoría para la relación

const Componente = sequelize.define('Componente', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  precio: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  categoriaId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: Categoria,
      key: 'id'
    }
  }
}, {
  timestamps: false // Opcional: si no quieres las columnas createdAt y updatedAt
});

// Definimos la relación con la tabla de Categorías
Componente.belongsTo(Categoria, { foreignKey: 'categoriaId' });
Categoria.hasMany(Componente, { foreignKey: 'categoriaId' });

module.exports = Componente;
