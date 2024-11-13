module.exports = (sequelize, Sequelize) => {
    const NhaSanXuat = sequelize.define("nha_san_xuat", {
      ID: {
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      ten_nSX: {
        type: Sequelize.STRING(255),
        allowNull: false,
      },
    }, {
      timestamps: false,
      tableName: "nha_san_xuat",
    });
  
    return NhaSanXuat;
  };
  