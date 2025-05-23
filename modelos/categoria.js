const { DataTypes } = require('sequelize');
const sequelize = require('../database/database');

const Categoria = sequelize.define('Categoria', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  // Si quieres el campo 'descripcion' que tenías en tu .schema, añádelo aquí:
  // descripcion: {
  //   type: DataTypes.TEXT,
  //   allowNull: true // o false si es obligatoria
  // }
}, {
  tableName: 'categorias', // 
  timestamps: false
});

module.exports = Categoria;
