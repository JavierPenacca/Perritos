const { DataTypes } = require('sequelize');
// const { v4: uuidv4 } = require('uuid');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('Dog', {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      allowNull: false,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        len: {
          args: [3, 20],
          msg: 'Debe tener entre 3 y 20 caracteres'
        }
      }
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    life_span: {
      type: DataTypes.STRING,
      allowNull: false,
    },
		heightMin: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		heightMax: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weightMin: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
		weightMax: {
			type: DataTypes.INTEGER,
			allowNull: false,
		},
    createdBd: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: true,
    }
  },
    { freezeTableName: true, timestamps: false }
  );
};
