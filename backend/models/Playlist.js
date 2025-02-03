const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Playlist = sequelize.define("Playlist", {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.TEXT,
    allowNull: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  songs: {
    type: DataTypes.JSON, 
    allowNull: false,
  },
});

module.exports = Playlist;