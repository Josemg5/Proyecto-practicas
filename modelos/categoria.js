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
<<<<<<< HEAD
  },
  // Si quieres el campo 'descripcion' que tenías en tu .schema, añádelo aquí:
  // descripcion: {
  //   type: DataTypes.TEXT,
  //   allowNull: true // o false si es obligatoria
  // }
}, {
  tableName: 'categorias', // 
  timestamps: false
=======
  }
}, {
  timestamps: false // Opcional: si no quieres las columnas createdAt y updatedAt
>>>>>>> 32cbab735d4ae7ecfde9eb41bf5d7aa45af1e30f
});

module.exports = Categoria;
