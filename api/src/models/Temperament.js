const { DataTypes } = require('sequelize');
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
    // defino el modelo
    sequelize.define('Temperament', {
        // No es necesario definir el ID ya que sequelize al no encontrarlo lo genera automáticamente
        // id: {
        //     type: DataTypes.INTEGER,
        //     primaryKey: true,
        //     autoincrement: true,
        //     unique: true,
        // },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
    },
        { freezeTableName: true, timestamps: false }
    );
};